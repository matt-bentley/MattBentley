import { NgModule } from '@angular/core';
import { ShareModule } from '../shared/share.module';

import { SharedModule } from '../shared/shared.module';
import { routing } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { ChangeNameComponent } from './changename/change-name.component';
import { ChangePasswordComponent } from './changepassword/change-password.component';

@NgModule({
   imports: [
      routing,
      ShareModule,
      SharedModule],
   declarations: [ProfileComponent, ChangeNameComponent, ChangePasswordComponent],
   providers: []
})
export class ProfileModule { }
