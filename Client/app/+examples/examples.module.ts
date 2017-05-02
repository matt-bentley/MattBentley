import { NgModule } from '@angular/core';
import { ShareModule } from '../shared/share.module';

import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromEvent';

import { SharedModule } from '../shared/shared.module';
import { routing } from './examples.routes';
import { ExamplesComponent } from './examples.component';

@NgModule({
   imports: [
      routing,
      ShareModule,
      SharedModule
   ],
   providers: [],
   declarations: [
      ExamplesComponent
   ]
})
export class ExamplesModule { }
