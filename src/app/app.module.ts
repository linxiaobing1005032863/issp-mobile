import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler,NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';//获取摄像头
import { Geolocation } from '@ionic-native/geolocation';//获取定位
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';//拨打电话号码
import { PhotoViewer } from '@ionic-native/photo-viewer';//全屏显示图像
import { InAppBrowser } from '@ionic-native/in-app-browser';//打开浏览器
import { AppVersion } from '@ionic-native/app-version';//查看当前手机版本号
import { SpeechRecognition } from '@ionic-native/speech-recognition';//语音
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';//file upload and download
import { JPush } from 'ionic-native-jpush';//极光推送
import { CodePush } from '@ionic-native/code-push';//热更新

import { SharedModule } from './shared.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MultiPickerModule } from 'ion-multi-picker';
import { PROVIDERS } from './imports';

@NgModule({
  declarations: [
    MyApp,
  ], 
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',//隐藏tab
      backButtonText:'',
      cancelButton:' 取消'
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    MultiPickerModule ,
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    PROVIDERS,
    SplashScreen,
    ImagePicker,
    Camera,
    CallNumber,
    PhotoViewer,
    Geolocation,
    InAppBrowser,
    AppVersion,
    FileTransfer,
    FileTransferObject,
    SpeechRecognition,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JPush,
    CodePush
  ]
})
export class AppModule {}
