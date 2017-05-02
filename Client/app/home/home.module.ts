import { NgModule } from '@angular/core';

import { ShareModule } from '../shared/share.module';

import { HomeComponent } from './home.component';
import { DialogElementsExampleDialog } from './home-dialog.component';

import { routing } from './home.routes';

@NgModule({
   imports: [
      ShareModule,
      routing
   ],
   declarations: [HomeComponent, DialogElementsExampleDialog],
   entryComponents: [DialogElementsExampleDialog]
})
export class HomeModule { }
