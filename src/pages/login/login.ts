import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController,LoadingController,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../providers/util/toast.service';
import { GlobalData } from '../../providers/GlobalData';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private userName :string;
  private password :string;
  leave:boolean = false;
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public alertCtrl: AlertController,
    public http : ToastService,
    public globalData :GlobalData,
    public loadingCtrl: LoadingController,
    private viewCtrl: ViewController) {
  }
  ionViewDidLoad() {
    
  }
  ionViewCanLeave():boolean {
    return this.leave? true : false;
  }
  login (name:string,pas: string) {
    let loader = this.loadingCtrl.create({
      content: "请稍等..."
    });
    loader.present();
    this.http.getUser(`v1/login`,{account:name,password:pas})
    .then(res => {
      this.leave = true;
      if(res.code == 0){
        localStorage.setItem('userName',name);
        localStorage.setItem('password',pas);
        this.storage.set('token',res.data);
        this.storage.get('token').then((val) => {
          this.globalData.token = val;
          localStorage.setItem('token',res.data);//持久保存在本地
          this.viewCtrl.dismiss();
        })
      }else {
        let confirm = this.alertCtrl.create({
          title: '登录失败!!!',
          message: res.msg,
          buttons: [
              {
                text: '确认'
              }
            ]
          });
          confirm.present();
      }
      loader.dismiss();
    }).catch(err=> {
        this.leave = true;
        loader.dismiss();
        this.http.presentToast('服务器错误，请联系管理员');
    })
  }
  forget() {
    this.leave = true;
    this.navCtrl.push('ForgetPage'); 
  }
  register():void {
    this.leave = true;
    this.navCtrl.push('RegisterPage'); 
  }
}