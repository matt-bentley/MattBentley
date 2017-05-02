import { Component, OnInit } from '@angular/core';
import { routerTransition, hostStyle } from '../shared/animations/animations';
import { Router } from '@angular/router';

import { LoginModel } from '../core/models/login-model';
import { AccountService } from '../core/account/account.service';
import { UtilityService } from '../core/services/utility.service';

@Component({
   selector: 'appc-login',
   styleUrls: ['./login.component.scss'],
   templateUrl: './login.component.html',
   animations: [routerTransition()],
   // tslint:disable-next-line:use-host-property-decorator
   host: hostStyle()
})
export class LoginComponent implements OnInit {
   public loginModel: LoginModel;
   public errors: string[] = [];
   public controls: any;

   constructor(
      public accountService: AccountService,
      public router: Router,
      public utilityService: UtilityService
   ) {
      this.loginModel = {
         email: '',
         password: ''
      };
   }

   public login(): void {
      this.errors = [];
      this.accountService.login(this.loginModel)
         .subscribe(() => {
            this.accountService.updateLoggedIn(true);
            this.utilityService.navigate('');
         },
         (errors: any) => {
            this.accountService.updateLoggedIn(false);
            this.errors = errors;
         });
   }

   public ngOnInit() {

   }
}
