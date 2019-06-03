import { Injectable } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverUrl = environment.serverRoute;

  constructor(
    private authorizationService: AuthorizationService,
    private http: HttpClient
  ) { }

  checkCredentials(email, password) {
    return this.http.request('POST', this.serverUrl + '/login', {
      responseType: 'json',
      params: {
        email: email,
        password: password
      }
    }).pipe(
      catchError(this.handleError('checkCredentials'))
    );
  }

  login(data) {
    this.authorizationService.login(data);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead
      error = {
        error: true,
        message: error.error.message
      }
      // Let the app keep running by returning an empty result.
      return result ? of(result as T): of(error as T);
    };
  }

}
