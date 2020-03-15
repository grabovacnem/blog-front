import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Injectable()
export class HttpRequestService {

  static checkOnlineStatus(window: Window): boolean {
    return window.navigator.onLine;
  }

  constructor(
    private http: HttpClient
  ) {
  }

  private handleError(errorResponse: HttpErrorResponse | any): Observable<never> {
    const errMsg = errorResponse instanceof HttpErrorResponse ?
      (errorResponse.error.message ? errorResponse.error.message : errorResponse.message) : errorResponse.message;
    const errStatus = errorResponse instanceof HttpErrorResponse ? errorResponse.status : null;

    return throwError({status: errStatus, message: errMsg});
  }

  get(url: string): Observable<any> {
    return this.http.get(url, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response.body;
        }),
        catchError((error: HttpErrorResponse | any) => this.handleError(error))
      );
  }

  post(url: string, request: any): Observable<any> {
    return this.http.post(url, request, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response.body;
        }),
        catchError((error: HttpErrorResponse | any) => this.handleError(error))
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<Object>) => {
          return response.body;
        }),
        catchError((error: HttpErrorResponse | any) => this.handleError(error))
      );
  }

  put(url: string, request: any): Observable<any> {
    return this.http.put(url, request, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<Object>) => {

          return response.body;
        }),
        catchError((error: HttpErrorResponse | any) => this.handleError(error))
      );
  }
}
