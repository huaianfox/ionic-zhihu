import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, ModalController, LoadingController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseUi';

import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';

declare let cordova: any;

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {
  userid: string;
  errorMsg: any;
  lastImage: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtr: ActionSheetController,
    public modalCtr: ModalController,
    public loadingCtr: LoadingController,
    public toastCtr: ToastController,
    public camera: Camera,
    public file: File,
    public transfer: Transfer,
    public filePath: FilePath,
    public platform: Platform,
    public storage: Storage) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then(id => {
      if (id) {

      }
    })
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtr.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库选择',
          handler() {

          }
        },
        {
          text: '相机',
          handler() {

          }
        }, {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    const options = {
      qulity: 100,
      sourceType,
      saveToPhotoAlbum: false, // 是否保存拍摄的照片到相册中去
      correctOrientation: true
    }

    this.camera.getPicture(options).then(imagePath => {
      // 处理 android路径
      let correctPath: string;
      let currentName: string;
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filepath => {
            const index = filepath.lastIndexOf('/') + 1;
            const index_name = filepath.lastIndexOf('?');
            correctPath = filepath.substr(0, index);
            currentName = filepath.substr(index, index_name)
          })
      } else {
        const index = imagePath.lastIndexOf('/') + 1;
        correctPath = imagePath.substr(0, index);
        currentName = imagePath.substr(index)
      }
      this.copyFile2LocalDir(correctPath, currentName, this.createFileName())
    },
      error => {
        super.showToast(this.toastCtr, '图片出现错误')
      });
  }
  /**
   *将获取的图片或相机拍摄到的图片进行另存为，用于后期上传使用
   *
   * @param {string} path
   * @param {string} currentName
   * @param {string} newName
   * @memberof HeadfacePage
   */
  copyFile2LocalDir(path: string, currentName: string, newName: string) {
    this.file.copyFile(path, currentName, cordova.file.dataDirectory, newName).then(
      success => {
        this.lastImage = newName
      }, error => {
        super.showToast(this.toastCtr, '存储图片到本地出错');
      })
  }
  /**
   *
   *
   * @returns
   * @memberof HeadfacePage
   */
  createFileName() {
    const time = Date.now();
    return `${time}.jpg`;
  }

}
