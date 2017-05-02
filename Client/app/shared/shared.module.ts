import { NgModule, ModuleWithProviders } from '@angular/core';
import { ShareModule } from './share.module';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageHeadingComponent } from './directives/page-heading.directive';
import { DynamicFormComponent } from './forms/dynamic-form.component';
import { DynamicFormControlComponent } from './forms/dynamic-form-control.component';
import { ErrorMessageComponent } from './forms/error-message.component';
import { ErrorSummaryComponent } from './forms/error-summary.component';
import { FormControlService } from './forms/form-control.service';
import { ApiTranslationLoader } from './services/api-translation-loader.service';

import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { BackToTopComponent } from './layout/back-to-top.component';

import { UppercasePipe } from './pipes/uppercase.pipe';

// Services
import { ContentService } from './services/content.service';

@NgModule({
   imports: [
      ShareModule,
      RouterModule,
      NgbModule.forRoot(),
      TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: ApiTranslationLoader } }),
      // No need to export as these modules don't expose any components/directive etc'
      HttpModule,
      JsonpModule
   ],
   declarations: [
      DynamicFormComponent,
      DynamicFormControlComponent,
      ErrorMessageComponent,
      ErrorSummaryComponent,
      FooterComponent,
      HeaderComponent,
      BackToTopComponent,
      PageHeadingComponent,
      UppercasePipe
   ],
   exports: [
      // Modules
      RouterModule,
      NgbModule,
      // Providers, Components, directive, pipes
      DynamicFormComponent,
      DynamicFormControlComponent,
      ErrorSummaryComponent,
      ErrorMessageComponent,
      FooterComponent,
      HeaderComponent,
      PageHeadingComponent,
      BackToTopComponent,
      UppercasePipe
   ]

})
export class SharedModule {
   public static forRoot(): ModuleWithProviders {
      return {
         ngModule: SharedModule,
         providers: [
            FormControlService,
            ContentService
         ]
      };
   }
}
