import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-feedback-deal',
  templateUrl: 'feedback-deal.html',
})
export class FeedbackDealPage {
  paramObj: any = { chargerAuditStatus: '通过' };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackDealPage');
  }

}
