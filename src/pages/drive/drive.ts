import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DrivePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-drive',
  templateUrl: 'drive.html',
})
export class DrivePage {
  car: string = "allCar";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrivePage');
  }

  //添加出车
  add() {
    this.navCtrl.push('DriveAddPage')
  }
  //出车详情
  details() {
    this.navCtrl.push('DriveDetailsPage')
  }
}
