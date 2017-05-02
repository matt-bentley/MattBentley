// tslint:disable
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from './../../app-store';
import { AccountService } from './../../core/account/account.service';
import { AuthTokenService } from './../../core/auth-token/auth-token.service';
import { UtilityService } from '../../core/services/utility.service';


@Component({
   selector: 'appc-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
   public isCollapsed: boolean = true;
   public languages = [
      { locale: 'en', description: 'English' },
      { locale: 'fr', description: 'French' }
   ];
   public currentLanguage = this.languages[0];
   public loggedIn: boolean = false;

   constructor(
      public tokens: AuthTokenService,
      public store: Store<AppState>,
      public accountService: AccountService,
      public translation: TranslateService,
      private _utilityService: UtilityService
   ) { }

   public navigate(path: string): void {
      this._utilityService.navigate('/' + path);
   }

   public onLinkClick($event: any): void {
      let path: string = $event.target.innerText.toString().trim();
      this.navigate(path.toLowerCase());
   }

   public ngOnInit(): void {
      this.accountService.loggedIn$.subscribe(
         l => {
            this.loggedIn = l;
         });
   }

   public toggleNav() {
      this.isCollapsed = !this.isCollapsed;
   }

   public setLang(lang: any) {
      this.currentLanguage = lang;
      this.translation.use(lang.locale);
   }

   public ngOnDestroy(): void {
      this.tokens.unsubscribeRefresh();
   }
}
