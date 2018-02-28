import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController ,Content,App ,Navbar,Events } from 'ionic-angular';
import { ToastService } from '../../providers/util/toast.service';
import { APP_URL } from '../../config/config';
import { NativeService } from '../../providers/NativeService';

@IonicPage()
@Component({
  selector: 'page-borrowmanage',
  templateUrl: 'borrowmanage.html'
})
export class BorrowManagePage {
  private show :boolean = false;
  private seleFont :string = '全部';
  private statusList :any;
  private tab :boolean;
  private statusL:string = 'ALL';//请求参数
  private pageNum: number = 1;//分页
  private items :any = [
    {
      value:'全部',
      msg:'ALL'
    },
    {
      value:'待审核',
      msg:'WAITAUDIT'
    },
    {
      value:'待付款',
      msg:'WAITPAY'
    },
    {
      value:'已借款',
      msg:'HASLEND'
    },
    {
      value:'待还款',
      msg:'WAITRETURN'
    },
    {
      value:'已还款',
      msg:'HASRETURN'
    },
    {
      value:'待解冻',
      msg:'WAITTHAW'
    }
  ];
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navBar: Navbar;
  private hideBtn :boolean = true;//控制 上拉加载 true 为显示
  
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl: ViewController,
     public http:ToastService,
     public navHttp: NativeService,
     public app: App,
     public events: Events
     ) {
    this.tab = navParams.get('tab');
    
  }
  // backButtonClick = (e: UIEvent) => {
  //       this.navCtrl.pop();
  //   }
  ionViewDidLoad() {
    
    // this.navBar.backButtonClick = this.backButtonClick;

    let load = this.http.loadding();
    load.present();
    let p1 = this.http.get(APP_URL+'phoneApplylend/v1/listAll',{lendPhoneSelectStatus:this.statusL,page:this.pageNum})
    Promise.all([p1])
      .then((res) => {
        load.dismiss();
         if(res.length){
           this.statusList = res[0].data;
         }
      }).catch(err=> {
        load.dismiss();
        this.http.presentToast('服务器错误，请联系管理员');
      })
    if(this.tab){
      this.viewCtrl.showBackButton(false);
    }
  }
  ionViewWillEnter() {
    localStorage.setItem('root','root');
  }
  ionViewDidLeave() {
    localStorage.setItem('root','');
  }
  createUser(user) {
    this.events.publish('root', user);
  }
  selectFilter(val:string,title:string) :any {
    this.show = !this.show;
    this.statusL = val;//选择的文字对应的英文参数
    this.seleFont = title;//选择的文字
    this.statusList = [];
    if(val){
      this.pageNum = 1;
      this.http.get(APP_URL+'phoneApplylend/v1/listAll',{lendPhoneSelectStatus:val,page:1})
      .then(res => {
        if(res.data){
          this.statusList = res.data;
          this.hideBtn = true;//释放上拉加载功能
          this.content.scrollTo(0,0,0);//控制滚动到最顶端
        }
      });
    }
  }
  toPage() {
    this.navCtrl.push('ApplyborrowmoneyPage');
  }
  goDetail(value:string,id:string) {
    let name :string;
    switch(value){
      case '全部':
            name = 'ALL'
            break;
        case 'WAITAUDIT':
            name = 'WAITAUDIT'
            break;
        case 'WAITPAY'://待付款
            name = 'WAITPAY'
            break;
        case 'WAITRETURN'://待还款
            name = 'WAITRETURNCHECK'
            break;
        case 'HASRETURN'://已还款
            name = 'RETURNCHECK'
            break;
        case 'HASLEND'://已借款
            name = 'SURERECEIVE'
            break;
        case 'WAITTHAW'://待解冻
            name = 'WAITTHAW'
            break;
        }
    this.navCtrl.push('BorrowDetailPage',{value:value,name:name,id:id});
  }
  //关闭返回首页
  closeModal() {
    this.navCtrl.popToRoot();
  }
  //上拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.pageNum++;
      this.http.get(APP_URL+'phoneApplylend/v1/listAll',{lendPhoneSelectStatus:this.statusL,page:this.pageNum})
      .then(res => {
        let data = res.data;
        if(res.code == 0){
          if(res.data){
            for( let i = 0,len = data.length,val;i < len;i++){
              val = data[i];
              this.statusList.push(val);
            }
          }else{
            this.hideBtn = false;
          }
        }
        infiniteScroll.complete();
      });
      //infiniteScroll.enable(value) value = false 停止下拉操作
    },500);
  }
}
