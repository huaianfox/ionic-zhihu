import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  /**
   *Creates an instance of RestProvider.
   * @param {HttpClient} http
   * @memberof RestProvider
   */
  constructor(public http: HttpClient) {
    // console.log('Hello RestProvider Provider');
  }
  /**
   *
   *
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
   *
   *
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
   *
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
