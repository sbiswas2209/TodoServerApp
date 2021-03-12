import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewTaskPage } from '../pages/new-task/new-task';

import { IonicStorageModule } from '@ionic/storage';
import { DeleteConfirmPage } from '../pages/delete-confirm/delete-confirm';

import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import { EditTaskPage } from '../pages/edit-task/edit-task';
import { Camera } from '@ionic-native/camera';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    LoginPage,
    HomePage,
    NewTaskPage,
    DeleteConfirmPage,
    EditTaskPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    LoginPage,
    HomePage,
    NewTaskPage,
    DeleteConfirmPage,
    EditTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    HttpClientModule,
    HttpClient,
    HttpHandler,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
