import { NgModule } from '@angular/core';
import { ShareModule } from '../shared/share.module';
import { SharedModule } from '../shared/shared.module';

import { RegisterComponent } from './+register/register.component';
import { RegisterConfirmationComponent } from './+confirmation/register-confirmation.component';
import { routing } from './register.routes';

@NgModule({
   imports: [
      routing,
      ShareModule,
      SharedModule
   ],
    declarations: [RegisterComponent, RegisterConfirmationComponent]
})
export class RegisterModule { }
