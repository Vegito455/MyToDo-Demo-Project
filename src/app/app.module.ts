import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as data from '../assets/Demodb.json/data.json';
import { LoginComponent } from './login/login.component';
import * as _ from 'lodash';
import { RegistrationComponent } from './registration/registration.component';
import { GlobalConstants } from './global';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { AlertsModule } from 'angular-alert-module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import {HttpClientModule,HttpClient} from '@angular/common/http';
import { ToastrService, ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { CalanderComponent } from './calander/calander.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { MainCardComponent } from './main-card/main-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    CalanderComponent,
    MainCardComponent,
    // HttpClient
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularFontAwesomeModule
    ReactiveFormsModule,
    FormsModule,
    // AlertsModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation:"increasing",
      
      
    }),
    HttpClientModule,
    ToastContainerModule,
    CalendarModule
    

  ],
  providers: [
    GlobalConstants,
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  externalData: any = (data as any).default;
}
