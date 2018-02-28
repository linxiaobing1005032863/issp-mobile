import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DriveAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-drive-add',
  templateUrl: 'drive-add.html',
})
export class DriveAddPage {
  paramObj: any = { vacateType: "", endDate: '2017-10-1' };
  addProject: any = {
    bid_contract: false,
    party_a_bid_contract: false,
    whether_site_selection: false,
  };//添加项目
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriveAddPage');
  }

}
