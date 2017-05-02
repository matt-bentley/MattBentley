import { Component, OnInit } from '@angular/core';
import { routerTransition, hostStyle } from '../../router.animations';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterModel } from '../../core/models/register-model';
import { AccountService } from '../../core/account/account.service';

@Component({
   selector: 'appc-register',
   templateUrl: './register.component.html',
   styleUrls: ['./register.component.scss'],
   animations: [routerTransition()],
   // tslint:disable-next-line:use-host-property-decorator
   host: hostStyle()
})
export class RegisterComponent implements OnInit {
   public errors: string[] = [];
   public registerModel: RegisterModel;

   constructor(public accountService: AccountService, public router: Router, public route: ActivatedRoute) {
      this.registerModel = {
         firstname: '',
         lastname: '',
         userName: '',
         email: '',
         password: '',
         confirmPassword: ''
      }
   }

   public register(): void {
      this.registerModel.userName = this.registerModel.email;
      this.accountService.register(this.registerModel)
         .subscribe((res: Response) => {
            this.router.navigate(['../registerconfirmation'], { relativeTo: this.route, queryParams: { emailConfirmed: true } });
         },
         (errors: string[]) => {
            this.errors = errors;
         });
   };

   public ngOnInit() {

   }

}
