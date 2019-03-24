import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { BaseUI } from '../../common/baseUi';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage'


// @IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {
  headface: string;
  nickName: string = '加载中...';
  errorMsg: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtr: ModalController,
    public loadingCtr: LoadingController,
    public rest: RestProvider,
    public toastCtr: ToastController,
    public viewCtr: ViewController,
    public storage: Storage) {
    super();
  }

  ionViewDidEnter() {
    this.loadUserPage()
  }

  loadUserPage() {
    // 加载用户信息
    const loading = super.showLoading(this.loadingCtr, '正在加载中...')
    this.storage.get('UserId').then(data => {
      if (data != null) {
        this.rest.getUserInfo(data)
          .subscribe(
            data => {
              console.log(data)
              this.nickName = data['UserNickName'];
              this.headface = `${data['UserHeadface']}?t=${Date.now()}`;
              loading.dismiss();
            },
            error => this.errorMsg = <any>error
          )
      }
    });
  }

  updateInfo() {
    console.log(`this is update`)
    this.storage.get('UserId').then(id => {
      console.log(id);
      if (id) {
        const loading = super.showLoading(this.loadingCtr, '修改中...');
        this.rest.updateInfo(id, this.nickName)
          .subscribe(
            data => {
              loading.dismiss();
              if (data['Status'] == 'OK') {
                super.showToast(this.toastCtr, '修改成功');
              } else {
                super.showToast(this.toastCtr, data['StatusContent']);
              }
            },
            error => this.errorMsg = <any>error
          );
      }
    })
  }

  logout() {
    this.storage.remove('UserId');
    this.viewCtr.dismiss();
  }

}
