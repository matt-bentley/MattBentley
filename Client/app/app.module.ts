import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import 'hammerjs';
import 'mdn-polyfills/Object.assign';

import { routing } from './app.routes';
import { AppService } from './app.service';
import { appReducer } from './app-store';
import { AppComponent } from './app.component';
import { ProfileService } from './+profile/profile.service';

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserAnimationsModule,
      BrowserModule,
      routing,
      // FormsModule,
      HttpModule,
      // Only module that app module loads
      CoreModule.forRoot(),
      SharedModule.forRoot(),
      HomeModule,
      StoreModule.provideStore(appReducer),
      StoreDevtoolsModule.instrumentOnlyWithExtension()
   ],
   providers: [
      AppService,
      ProfileService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
