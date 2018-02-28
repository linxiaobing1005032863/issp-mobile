import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DriveDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-drive-details',
  templateUrl: 'drive-details.html',
})
export class DriveDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriveDetailsPage');
  }

  // 完善出车信息
  addMore() {
    this.navCtrl.push('DriveAddPage');
  }

  //去寄件
  addMail() {
    this.navCtrl.push('DriveMailingPage');
  }

  //手动审核
  gotoCheck() {
    this.navCtrl.push('DriveDealPage');
  }

  //去付款
  goPay() {
    this.navCtrl.push('DrivePayPage');
  }

  //查看原因
  itemReason() {
    this.navCtrl.push('DriveReasonPage');
  }
}
