import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, ActionSheetController, ToastController } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { CONTACT } from '../../../config/config';
import { CallNumber } from '@ionic-native/call-number';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-internal-address',
  templateUrl: 'internal-address.html',
})
export class InternalAddress {

  id: string;
  detailData: any = {};
  phoneMobile: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public http: ToastService,
    public app: App,
    private callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController) {
    this.id = navParams.get('id');

    this.http.get(CONTACT + `internalcontacts/v1/mobile/findByID/${this.id}`)
      .then(res => {
        this.detailData = res.data;
      })
  }

  //关闭返回首页
  closeModal() {
    this.navCtrl.push(TabsPage, { page: 2 });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  showCall() {
    this.http.get(CONTACT + `internalcontacts/v1/mobile/tel`)
      .then(res => {
        if (res.msg) {
          this.presentToast(res.msg);
        }
        if (res.data - length) {
          this.phoneMobile = res.data;
          let actionSheet = this.actionSheetCtrl.create({
            title: '选择需拨打的号码',
            buttons: [
              {
                text: this.phoneMobile[0].phone,
                handler: () => {
                  this.callNumber.callNumber(this.phoneMobile[0].phone, true)
                    .then(() => console.log(123))
                    .catch(() => console.log('Error launching dialer'));
                }
              },
              {
                text: this.phoneMobile[0].phoneNumberA,
                handler: () => {
                  console.log(1);
                }
              },
              {
                text: this.phoneMobile[0].phoneNumberB,
                handler: () => {
                  console.log(2);
                }
              },
              {
                text: this.phoneMobile[0].phoneNumberC,
                handler: () => {
                  console.log(3);
                }
              },
              {
                text: this.phoneMobile[0].phoneNumberD,
                handler: () => {
                  console.log(4);
                }
              },
              {
                text: '取消',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          })
          actionSheet.present();
        }

      });
  }
  ionViewDidLoad() {
  }

}
