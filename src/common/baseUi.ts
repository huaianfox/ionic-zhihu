import { Loading, LoadingController, ToastController, Toast } from 'ionic-angular';

export abstract class BaseUI {
  constructor() { }
  /**
   * @protected
   * @param {LoadingController} loadingController
   * @param {string} msg
   * @returns {Loading}
   * @memberof BaseUI
   */
  protected showLoading(loadingController: LoadingController, msg: string): Loading {
    const loadinger = loadingController.create({
      content: msg,
      dismissOnPageChange: true
    })
    loadinger.present();
    return loadinger;
  }

  protected showToast(toastController: ToastController, message: string): Toast {
    const toast = toastController.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}