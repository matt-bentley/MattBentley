import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register-model';
import { Response, Http } from '@angular/http';

import { LoginModel } from '../models/login-model';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';
import { LoggedInActions } from '../auth-store/logged-in.actions';
import { AuthTokenActions } from '../auth-token/auth-token.actions';
import { ProfileActions } from '../profile/profile.actions';
import { UtilityService } from '../../core/services/utility.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccountService {

   constructor(
      private http: Http,
      private authTokens: AuthTokenService,
      private store: Store<AppState>,
      private loggedInAction: LoggedInActions,
      private authTokenActions: AuthTokenActions,
      private profileActions: ProfileActions,
      private utilityService: UtilityService
   ) { }

   private _loggedInSource = new Subject<boolean>();

   public loggedIn$ = this._loggedInSource.asObservable();

   public updateLoggedIn(loggedIn: boolean): void {
      this._loggedInSource.next(loggedIn);
   }

   public register(data: RegisterModel): Observable<Response> {
      return this.http.post('api/account/register', data)
         .catch(res => Observable.throw(res.json()));
   }

   public login(user: LoginModel): Observable<Response> {
      return this.http.post('api/account/login', user)
         .catch(res => Observable.throw(res.json()));
      //return this.authTokens.getTokens(user, 'password')
      //    .catch(res => Observable.throw(res.json()))
      //    .do(res => this.authTokens.scheduleRefresh());
   }

   public logout() {
      this.updateLoggedIn(false);
      this.authTokens.deleteTokens();
      this.authTokens.unsubscribeRefresh();

      this.store.dispatch(this.loggedInAction.notLoggedIn());
      this.store.dispatch(this.authTokenActions.delete());
      this.store.dispatch(this.profileActions.delete());

      this.utilityService.navigateToSignIn();
   }

}
