import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the FeedbackDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-feedback-details',
  templateUrl: 'feedback-details.html',
})
export class FeedbackDetailsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,

  ) {
  }

  ionViewDidLoad() {
  }

  deal() {
    let confirm = this.alertCtrl.create({
      message: '您确定要接受处理？',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.navCtrl.push('FeedbackDealPage')
          }
        },
        {
          text: '取消',
          handler: () => {
          }
        }

      ]
    });
    confirm.present();
  }

}
