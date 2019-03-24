import { Component } from '@angular/core';
import {
  // IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  notLogin: boolean = true;
  logined: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    public storage: Storage) {
  }
  /**
   *
   * @memberof MorePage
   */
  showLoginModal() {
    // ionic v3 v4　create参数不同
    const login = this.modalController.create(LoginPage);
    login.present();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then(data => {
      if (data !=null) {
        this.notLogin = false;
        this.logined = true;
      }
      else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

}
