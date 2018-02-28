import { Component,ViewChild } from '@angular/core';
import { AlertController,NavParams,Tabs, IonicPage, ModalController,NavController ,IonicApp } from 'ionic-angular';

import { ToastService } from '../../providers/util/toast.service';
import { NativeService } from '../../providers/NativeService';
import { HOME } from '../../config/config';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  tab1Root = 'HomePage';// HomePage  MinePage
  tab2Root = 'WaitManagePage';
  tab3Root = 'ContactsPage';
  tab4Root = 'MinePage';
  constructor(public navCtrl: NavController,public navParams:NavParams,public http: ToastService,public nativeHttp: NativeService,private alertCtrl: AlertController,public modalCtrl: ModalController) {
  }
  // ionViewDidLoad
  ionViewWillEnter():void {
    if(this.nativeHttp.isMobile()){
      this.http.get(HOME + '/oldissp/v1/phone/version')
        .then(res => {
          var data = res.data;
          if(data.version > 10100){
            const alert = this.alertCtrl.create({
              title: '是否更新版本',
              message: data.description,
              buttons: [
                {
                  text: '取消'
                },
                {
                  text: '确认更新',
                  handler: () => {
                    this.nativeHttp.openUrlByBrowser(data.url);
                  }
                }
              ]
            });
            alert.present(); 
          }
        }) 
    }
    if(this.navParams.get('page')) {
      this.tabs.select(this.navParams.get('page'));
    }
  }
}
