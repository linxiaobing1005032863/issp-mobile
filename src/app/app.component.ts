import { Component, ViewChild } from '@angular/core';
import { Platform ,IonicApp ,Nav ,ToastController ,ModalController ,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastService } from '../providers/util/toast.service';
import { GlobalData } from '../providers/GlobalData';
import { NativeService } from '../providers/NativeService';
import { USER_URL } from '../config/config'; 
import { CodePush, SyncStatus } from '@ionic-native/code-push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = '';
  backButtonPressed: boolean = false;
  public userName =localStorage.getItem("userName");
  public password =localStorage.getItem("password");
  back: string;
  @ViewChild('myNav') nav: Nav;
  constructor(
    public platform: Platform, 
    statusBar: StatusBar,
    public http : ToastService,
    splashScreen: SplashScreen,
    public globalData: GlobalData,
    public nativeHttp: NativeService,
    public codePush: CodePush,
    public ionicApp: IonicApp,
    public toastCtrl:ToastController,
    private modalCtrl: ModalController,
    public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.globalData.token = localStorage.getItem('token');
      this.rootPage = 'DrivePage';//LoginPage //Welcome TestPage  LoginPage  TabsPage
      let modal = this.modalCtrl.create('DrivePage',null,{enterAnimation:null});
      modal.present();
    });
    
    this.registerBackButtonAction();//注册返回按键事件
  }
  registerBackButtonAction() {
     this.platform.registerBackButtonAction(() => {
       //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上        
       this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      
       let activePortal = this.ionicApp._modalPortal.getActive();
       
       if (activePortal) {
         activePortal.dismiss().catch(() => {});
         activePortal.onDidDismiss(() => {});
         return;
       } 
       let activeVC = this.nav.getActive();
       let tabs = activeVC.instance.tabs;
       let activeNav = tabs.getSelected();
       if(localStorage.getItem('root')){
         return activeNav.popToRoot();
       }
       return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
     }, 1);
   }
   //双击退出提示框
   showExit() {
     if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
       this.platform.exitApp();
     } else {
       this.toastCtrl.create({
         message: '再按一次退出应用',
         duration: 2000,
         position: 'top'
       }).present();
       this.backButtonPressed = true;
       setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
     }
   }
}