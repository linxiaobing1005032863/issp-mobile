import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { NativeService } from '../../providers/NativeService';
import { USER_URL } from '../../config/config'
let aa = false;
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {
  leave: boolean = false;
  time1: any;
  imgSrcArr = [
    'assets/imgs/gif/bg9.jpg',
    'assets/imgs/gif/bg.jpg',
    'assets/imgs/gif/1round.png',
    'assets/imgs/gif/round2.png',
    'assets/imgs/gif/round3.png',
    'assets/imgs/gif/logo.png',
    'assets/imgs/gif/logo1.png',
    'assets/imgs/gif/pt.png',
    'assets/imgs/gif/people.png',
    'assets/imgs/gif/thing.png',
    'assets/imgs/gif/money.png',
    'assets/imgs/gif/business.png',
    'assets/imgs/gif/push.png',
  ];
  imgWrap = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService,
    public nativeHttp: NativeService,
    public modalCtrl: ModalController,
    private viewCtrl: ViewController) {

  }
  ionViewDidLoad() {
    this.preloadImg(this.imgSrcArr);
    setTimeout(() => {
      this.fn();
      document.onclick = function () {
        aa = !aa;
      }
    }, 2000)
  }
  ionViewWillLeave() {
    clearInterval(this.time1);
  }
  ionViewCanLeave(): boolean {
    return this.leave ? true : false;
  }
  preloadImg(arr) {
    for (var i = 0; i < arr.length; i++) {
      this.imgWrap[i] = new Image();
      this.imgWrap[i].src = arr[i];
    }
  }
  fn(): void {
    let dom = document.getElementsByClassName('wh');
    let flag = 0;
    let before = 0;
    this.time1 = setInterval(function () {
      if (aa) return;
      if (flag > 0 && flag < 6) {
        dom[flag - 1]['style'].display = 'none';
      }
      flag = flag + 1;
      if (flag > 5) {
        clearInterval(this.time1);
        document.getElementsByClassName('logo1')[0].classList.add('finish');
        document.getElementsByClassName('logo1')[1].classList.add('finish');
        document.getElementsByClassName('logo1')[2].classList.add('finish');
      } else {
        var reg = new RegExp('show' + flag);
        if (!reg.test(dom[flag - 1].className)) {
          dom[flag - 1].className += 'show' + flag;
        }
      }
      before = flag;
    }, 1300)

  }
  close() {
    let load = this.http.loadding();
    load.present();
    this.http.get(USER_URL + `v1/testToken`)
      .then(res => {
        this.leave = true;
        load.dismiss();//注销加载条
        if (res.code == 0) {
          this.viewCtrl.dismiss(null, null, { animate: false });//注销页面
        } else {
          this.viewCtrl.dismiss();
          let modal = this.modalCtrl.create('LoginPage');
          modal.present();
        }
      }).catch(err => {
        load.dismiss();//注销加载条
        this.viewCtrl.dismiss();
        let modal = this.modalCtrl.create('LoginPage');
        modal.present();
      })
  }
  push(str: string): void {
    let loanModal = this.modalCtrl.create(str);
    loanModal.present();
  }
}
