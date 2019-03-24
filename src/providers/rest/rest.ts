import { Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable()
export class RestProvider {

  /**
   *Creates an instance of RestProvider.
   * @param {HttpClient} http
   * @memberof RestProvider
   */
  constructor(public http: Http) {
    // console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";



  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  // todo... 实际业务要加密处理

  /**
   * 根据用户的手机号码和密码登录
   *
   * @param {number} mobile
   * @param {any} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  public login(mobile: number, password: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlLogin}?mobile=${mobile}&password=${password}`);
  }

  /**
   * 注册请求接口
   *
   * @param {number} mobile
   * @param {string} nickname
   * @param {string} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  public register(mobile: string, nickname: string, password: string): Observable<string[]> {
    return this.getUrlReturn(`${this.apiUrlRegister}?mobile=${mobile}&password=${password}&nickname=${nickname}`);
  }


  /**
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleErroer)
  }
  /**
   * 根据返回的数据处理成JSON
   * @private
   * @param {Response} res
   * @returns
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    const body = res.json();
    return JSON.parse(body) || {}
  }


  /**
   * 处理请求中的错误
   * 
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof RestProvider
   */
  private handleErroer(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
