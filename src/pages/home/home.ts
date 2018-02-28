import { Component } from '@angular/core';
import { JPush } from 'ionic-native-jpush';
import { NavController, IonicPage, ModalController, AlertController, App, Events } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ToastService } from '../../providers/util/toast.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  event: any;
  isPushStoppedResult: number;

  constructor(
    private http: ToastService,
    private navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private photoViewer: PhotoViewer,
    private jpush: JPush,
    private app: App,
    public events: Events
  ) {

  }
  //极光推送开始
  initEvent() {
    // 获取点击通知内容
    this.jpush.onOpenNotification().subscribe(event => {
      this.http.presentToast('openNotification')
      this.event = event;
      // {title:'issp先行版',alert:'大家好',extras:{info:'myhomepage'},app:'项目id'}
    }, err => {
      this.http.presentToast('openNotification-error')
    })
    // 获取通知内容
    this.jpush.onReceiveNotification().subscribe(event => {
      this.http.presentToast('receiveNotification')
      this.event = event
    }, err => {
      this.http.presentToast('receiveNotification-error')
    })
    // // 获取自定义消息推送内容
    this.jpush.onReceiveMessage().subscribe(event => {
      this.http.presentToast('receiveMessage')
      this.event = event
    }, err => {
      this.http.presentToast('receiveMessage-error')
    })
  }

  init() {
    this.jpush.init()
  }
  stopPush() {
    this.jpush.stopPush()
  }
  resumePush() {
    this.jpush.resumePush()
  }

  isPushStopped() {
    this.jpush.isPushStopped().then(result => {
      this.isPushStoppedResult = result
    })
  }
  //极光推送结束

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: '正在努力开发中',
      subTitle: '敬请期待...'
    });
    alert.present();
  }
  ionViewDidLoad() {
  }
  // 报销
  account() {
    this.navCtrl.push('ReimbursementPage');
  }

  // 借款
  loan() {
    this.navCtrl.push('BorrowManagePage');
  }

  //考勤
  punch() {
    this.navCtrl.push('Attendance');
  }
  // 公告
  bulletin() {
    this.navCtrl.push('AnnouncementPage');
  }
  //请假
  askForLeave() {
    this.navCtrl.push('AskforleavePage');
  }
  //加班
  overtime() {
    this.navCtrl.push('OverTimePage');
  }
  //反馈
  feedback() {
    this.navCtrl.push('FeedbackPage');
  }
  drive() {
    this.navCtrl.push('DrivePage');
  }

  clickBig() {
    this.photoViewer.show('/assets/imgs/advertising.jpg', '推广展示', { share: false });
  }
}
