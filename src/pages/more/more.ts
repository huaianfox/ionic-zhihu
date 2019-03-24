import { Component } from '@angular/core';
import {
  // IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController
} from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { LoginPage } from '../login/login';
import { BaseUI } from '../../common/baseUi';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {
  notLogin: boolean = true;
  logined: boolean = false;

  headface: string;
  userinfo: string[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public loadingCtr: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
  }

  /**
   *
   * @memberof MorePage
   */
  showLoginModal() {
    // ionic v3 v4　create参数不同
    const login = this.modalController.create(LoginPage);
    login.onDidDismiss(() => {
      this.loadUserPage();
    });
    login.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    // 加载用户信息
    const loading = super.showLoading(this.loadingCtr, '正在加载中...')
    this.storage.get('UserId').then(data => {
      if (data != null) {
        this.rest.getUserInfo(data)
          .subscribe(
            data => {
              this.userinfo = data
              this.headface = `${data['UserHeadface']}?t=${Date.now()}`;
              this.notLogin = false;
              this.logined = true;
              loading.dismiss();
            }
          )
      }
      else {
        loading.dismiss();
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

  toUserPage() {
    this.navCtrl.push(UserPage);
  }

}
