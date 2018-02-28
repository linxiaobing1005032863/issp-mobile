import { Component, Attribute } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { ATTEND_URL } from '../../config/config';
import { TabsPage } from '../tabs/tabs';
import { NativeService } from '../../providers/NativeService';

declare var LocationPlugin;
@IonicPage()
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class Attendance {
  private myDate;
  longitude: string = '113.38669';
  latitude: string = '23.12645';
  area: string = '广州';
  position: any = {};
  goCard: any = {};
  goWork: any = {};
  afterWork: any = {}
  time: any;
  longit: any;
  latitu: any;
  address: any;
  cardType: string = 'GO';
  afterType: string = 'AFTER';
  isUp: boolean = false;//是否打上班卡
  isDown: boolean = false;//是否打下班卡
  constructor(public alerCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: ToastService,
    public actionSheetCtrl: ActionSheetController,
    public navHttp: NativeService) {

    //考勤列表
    this.http.get(ATTEND_URL + `punch/v1/list`)
      .then(res => {
        this.goCard = res.data;

        //上班
        if (this.goCard[0].gos.length == 1) {
          let puch: any = [];
          for (var i = 0; i < this.goCard[0].gos[0].sons.length; i++) {
            puch.push(this.goCard[0].gos[0].sons[i].punchStatus);
          }
          this.goWork = {
            time: this.goCard[0].gos[0].punchTime.split(' ')[1],
            punchType: this.goCard[0].gos[0].punchType,
            punchStatus: puch.join(','),
            area: this.goCard[0].gos[0].area
          }
          this.isUp = true;
        } else {
          this.isUp = false;
        }
        //下班
        if (this.goCard[0].afters.length == 1) {
          let puch: any = [];
          for (var i = 0; i < this.goCard[0].afters[0].sons.length; i++) {
            puch.push(this.goCard[0].afters[0].sons[i].punchStatus);
          }
          this.afterWork = {
            time: this.goCard[0].afters[0].punchTime.split(' ')[1],
            punchType: this.goCard[0].afters[0].punchType,
            punchStatus: puch.join(','),
            area: this.goCard[0].afters[0].area
          }
          this.isDown = true;
        } else {
          this.isDown = false;
        }
      })

  }

  ionViewDidLoad() {

    setInterval(() => this.showTime(), 1000);
    LocationPlugin.getLocation(data => {
      this.longitude = data.longitude;
      this.latitude = data.latitude;
      this.area = data.address;
      // 查看打卡范围
      this.http.get(ATTEND_URL + `punch/v1/range`, { longitude: this.longitude, latitude: this.latitude, area: this.area })
        .then(res => {
          this.position = res.data;
        });
    }, msg => {
      console.log(JSON.stringify(msg));
    });


  }

  showTime() {
    let date = new Date();
    this.myDate = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' +
      date.getDate() + '  星期' +
      date.getDay() + ' ' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds();
  }
  toWork() {
    let alert = this.alerCtrl.create({
      title: '选择打卡方式',
      buttons: [
        {
          text: '上班',
          handler: () => {
            this.http.post(ATTEND_URL + `punch/v1/phone`, { longitude: this.longitude, latitude: this.latitude, area: this.area, punchType: this.cardType })
              .then(res => {
                this.goWork = res.data;
                this.goWork.time = this.goWork.punchTime.split(' ')[1];
                this.isUp = true;

                let msg: string;
                if (res.data) {
                  msg = '打卡成功';
                } else {
                  msg = `打卡失败: ${res.msg}`;
                }
                let workSuccess = this.alerCtrl.create({
                  message: msg,
                  buttons: [
                    {
                      text: '确认',
                      handler: () => {
                        this.http.get(ATTEND_URL + `punch/v1/list`)
                          .then(res => {
                            this.goCard = res.data;
                            //上班
                            if (this.goCard[0].gos.length == 1) {
                              let puch: any = [];
                              for (var i = 0; i < this.goCard[0].gos[0].sons.length; i++) {
                                puch.push(this.goCard[0].gos[0].sons[i].punchStatus);
                              }
                              this.goWork = {
                                time: this.goCard[0].gos[0].punchTime.split(' ')[1],
                                punchType: this.goCard[0].gos[0].punchType,
                                punchStatus: puch.join(','),
                                area: this.goCard[0].gos[0].area
                              }
                              this.isUp = true;
                            } else {
                              this.isUp = false;
                            }
                          })
                      }
                    }
                  ]
                });
                workSuccess.present();
              })

          }
        }, {
          text: '下班',
          handler: () => {
            this.http.post(ATTEND_URL + `punch/v1/phone`, { longitude: this.longitude, latitude: this.latitude, area: this.area, punchType: this.afterType })
              .then(res => {
                this.afterWork = res.data;
                this.afterWork.time = this.afterWork.punchTime.split(' ')[1];
                this.isDown = true;

                let msg: string;
                if (res.code == 0) {
                  msg = '打卡成功';
                } else {
                  msg = `打卡失败: ${res.msg}`;
                }
                let underSuccess = this.alerCtrl.create({
                  message: msg,
                  buttons: [
                    {
                      text: '确认',
                      handler: () => {
                        this.http.get(ATTEND_URL + `punch/v1/list`)
                          .then(res => {
                            this.goCard = res.data;
                            //下班
                            if (this.goCard[0].afters.length == 1) {
                              let puch: any = [];
                              for (var i = 0; i < this.goCard[0].afters[0].sons.length; i++) {
                                puch.push(this.goCard[0].afters[0].sons[i].punchStatus);
                              }
                              this.afterWork = {
                                time: this.goCard[0].afters[0].punchTime.split(' ')[1],
                                punchType: this.goCard[0].afters[0].punchType,
                                punchStatus: puch.join(','),
                                area: this.goCard[0].afters[0].area
                              }
                              this.isDown = true;
                            } else {
                              this.isDown = false;
                            }
                          })
                      }
                    }
                  ]
                });
                underSuccess.present();
              })

          }
        }
      ]
    })
    alert.present();
  }
}
