import { environment } from "../../../environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  get(path: string): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.api_url}${path}`)
      .pipe(catchError(this.handleError));
  }

  post(path: string, formObj: Object = {}): Observable<any> {
    return this.httpClient
      .post(`${environment.api_url}${path}`, formObj, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(catchError(this.handleError));
  }
  put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.handleError));
  }
  delete(path: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse): Observable<any> {
    if (errorResponse.error instanceof ErrorEvent) {
      // console.log("Client Side Error :", errorResponse);
      return throwError(errorResponse);
    } else {
      // const errorObs = of(errorResponse);
      // console.log("Server Side Error :", errorResponse);
      // return of();
      // return errorResponse.error
      // return errorObs;
      return throwError(errorResponse);
    }
    // return an observable with a meaningful error message to the end user
    // return throwError(
    //   "There is a problem with the service We are notified & working on it. Please try again later."+errorResponse.error.msg
    // );
  }
}
