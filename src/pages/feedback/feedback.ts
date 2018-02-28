import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  pet: string = "myfeedback";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }
  details() {
    this.navCtrl.push('FeedbackDetailsPage');
  }
  add() {
    this.navCtrl.push('FeedbackAddPage');
  }
}
