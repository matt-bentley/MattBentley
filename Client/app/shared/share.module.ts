import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule
   ],
   exports: [
      CommonModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
      MaterialModule,
      FormsModule,
      ReactiveFormsModule
   ]
})
export class ShareModule { }
