import { NgModule } from '@angular/core';
import { ShareModule } from '../shared/share.module';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about.component';

import { routing } from './about.routes';

@NgModule({
   imports: [
      ShareModule,
      SharedModule,
      routing
   ],
   declarations: [AboutComponent],
})
export class AboutModule { }
