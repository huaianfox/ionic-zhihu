import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseUi';
import { RestProvider } from '../../providers/rest/rest';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {
  mobile: number;
  password: string;
  errorMsg: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewControler: ViewController,
    public loadingCtr: LoadingController,
    public toastController: ToastController,
    public rest: RestProvider,
    private storage: Storage) {
    super();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  handleLogin() {
    const loading = super.showLoading(this.loadingCtr, '加载中．．．');
    this.rest.login(this.mobile, this.password)
      .subscribe(
        data => {
          console.log(data);
          if (data['Status'] === 'OK') {
            // todo
            // 实际生产环境存储接口的token

            this.storage.set('UserId', data['UserId']);
            this.dismiss();
          } else {
            super.showToast(this.toastController, data['StatusContent']);
          }
          loading.dismiss();
        },
        error => this.errorMsg = <any>error
      );
  }
  /**
   * 关闭当前页面的方法
   *
   * @memberof LoginPage
   */
  dismiss() {
    this.viewControler.dismiss();
  }

}
