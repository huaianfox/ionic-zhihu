import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { BaseUI } from '../../common/baseUi';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  errorMsg: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtr: LoadingController,
    public toastCtr: ToastController,
    public viewCtr: ViewController,
    public rest: RestProvider) {
    super();
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegisterPage');
  // }

  dismiss() {
    this.viewCtr.dismiss();
  }

  toLoginPage() {
    this.navCtrl.pop();
  }

  handleRegister() {
    const { password, confirmPassword, nickname, mobile } = this
    if (!/^1[34578]\d{9}$/.test(mobile)) {
      super.showToast(this.toastCtr, '手机格式不匹配');
      return;
    }
    if (password !== confirmPassword) {
      super.showToast(this.toastCtr, '两次输入的密码不匹配');
      return;
    }

    const loading = super.showLoading(this.loadingCtr, '注册中...');
    this.rest.register(mobile, nickname, password)
      .subscribe(
        data => {
          loading.dismiss();
          if (data['Status'] === 'OK') {
            super.showToast(this.toastCtr, '恭喜，注册成功。')
            this.dismiss();
          } else {
            super.showToast(this.toastCtr, data['StatusContent']);
          }
        },
        error => this.errorMsg = <any>error
      );

  }

}
