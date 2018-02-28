import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ActionSheetController, App,Events } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';//获取图片
import { APP_URL, FININIT } from '../../../config/config';
import { NativeService } from '../../../providers/NativeService';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-applyborrowmoney',
  templateUrl: 'applyborrowmoney.html',
})
export class ApplyborrowmoneyPage {
  paramObj :any={};
  lenderList :any =[];
  areaList :any = [];
  proNameList :any = [];
  proGroupList: any = [];
  firstList: any = [];//一级科目
  secondList: any = [];
  third:string;
  explaisList: any= [];//说明
  bigImg :string;
  Iamges:any = [
    // {id:1,url:'assets/imgs/userImage2.png'},{id:1,url:'assets/imgs/123.png'}
    ];
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    // sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http:ToastService,
    public alertCtrl: AlertController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    public actionSheetCtrl: ActionSheetController,
    private photoViewer: PhotoViewer,
    private transfer: FileTransfer,
    private navHttp: NativeService,
    private app:App,
    public events:Events
  )
     {
  }
  

  ionViewDidLoad() {
    if(this.navParams.get('id')){
      this.http.get(APP_URL+`phoneApplylend/v1/info/lend/${this.navParams.get('id')}/${this.navParams.get('name')}`)
      .then(res => {
        this.paramObj = res.data;
      });
    }else{
      this.http.get(APP_URL+`applylend/v1/getAllUser`)
        .then(res => {
          if(!res.code){
            this.lenderList = res.data;
          }else {
            this.http.presentToast(res.msg);
          }
      }).catch(()=> {
        this.http.presentToast('请联系管理员');
      })
      this.http.get(APP_URL+`phoneApplylend/v1/phone/getArea`)
        .then(res => {
          if(!res.code){
            this.areaList = res.data;
          }else {
            this.http.presentToast(res.msg);
          }
        }).catch(()=> {
          this.http.presentToast('服务器错误,请联系管理员');
        });
    }
  }
  //通过借款人获取一级科目和三级科目
  lenderCh(name:string) :void{
    this.http.get(APP_URL+`applylend/v1/findSubjects1`,{name:name})
        .then(res => {
          if(!res.code){
            this.firstList = res.data.firstSubjectDataBOs;
            this.third = res.data.thirdSubject;
            this.paramObj.thirdSubject = res.data.thirdSubjectCode;
          }else if(res.msg){
            this.http.presentToast(res.msg);
          }
        }).catch(()=> {
          this.http.presentToast('请联系管理员');
        })
  }
  areaCh() :void {
    this.http.get(APP_URL+`phoneApplylend/v1/phone/getPGroupList`,{area:this.paramObj.area})
      .then(res => {
        this.proGroupList = res.data;
      })
  }
  proFn (){//项目组 获取 项目名
    this.http.get(APP_URL+`phoneApplylend/v1/phone/getPNameList`,{area:this.paramObj.area,projectGroup:this.paramObj.projectGroup})
      .then(res => {
        if(!res.code){
          this.proNameList = res.data;
        }else if(res.msg){
          this.http.presentToast(res.msg);
        }
      })
  }
  firstFn (val: any) {//一级科目 获取 二级科目
    if(val){
      this.http.get(APP_URL+`applylend/v1/findSecondSubject`,{firstSubjectCode:val})
        .then(res => {
          if(!res.code){
            this.secondList = res.data;
          }else if(res.msg){
            this.http.presentToast(res.msg);
          }
        }).catch(err => {
          this.http.presentToast(err);
        })
    }
  }
  addImage() {
    
    let actionSheet = this.actionSheetCtrl.create({
      title:'选择照片形式',
      buttons: [
        {
          text: '拍摄',
          handler: () => {
            this.camera.getPicture(this.options).then((imageData) => {
              let b:any = {id:this.Iamges.length,url:''};
              // b.url = 'data:image/png;base64,'+imageData;
              b.url = imageData;
              this.Iamges.push(b);
            });
          }
        },{
          text: '从手机相册选择',
          handler: () => {
            var opt = { maximumImagesCount:9,outputType:0 };
            this.imagePicker.getPictures(opt).then((results)=>{
              for (var i = 0; i < results.length; i++) {
                let b:any = {id:this.Iamges.length,url:''}; 
                b.url = results[i];
                this.Iamges.push(b);
                this.navHttp.alert(results[i]);
              } 
            });
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();
  }
  
  showBig(url:string){
    this.photoViewer.show(url, '我的图片展示', {share: false});
  }
  delImage(val:number) :void{
    let actionSheet = this.actionSheetCtrl.create({
      title:'是否删除凭证',
      buttons: [
        {
          text: '确认删除',
          handler: () => {
            this.Iamges.splice(val,1);
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();
  }
  //提交
  submit() :void{
    if(this.navParams.get('id')){
      this.http.put('phoneApplylend/v1/error',this.paramObj)
      .then(res => {
        let msg:string;
        if(res.code == 0){
          msg = '此次编辑成功!';
        }else {
          msg = `编辑失败：${res.msg}`;
        }
        let confirm = this.alertCtrl.create({
          title: '消息提示',
          message: msg,
          buttons: [
              {
                text: '确认',
                handler: () => {
                  if(!res.msg)this.navCtrl.push('BorrowManagePage',{tab:true});
                }
              }
            ]
          });
          confirm.present();
      })
    }else{
      this.http.post('phoneApplylend/v1/add',this.paramObj)
    .then(res => {
      let msg:string;
      let id  = res.data.id;
      if(res.code == 0){
        msg = '此次申请借款成功!';
      }else {
        msg = `借款失败：${res.msg}`;
      }
      let confirm = this.alertCtrl.create({
        title: '消息提示',
        message: msg,
        buttons: [
            {
              text: '确认',
              handler: () => {
                this.navCtrl.push('BorrowManagePage',{tab:true});
                if(!res.msg){
                  const fileTransfer: FileTransferObject = this.transfer.create();
                      let options: FileUploadOptions = {
                      fileKey: 'files',
                      fileName: 'name.jpg',
                      mimeType:' image/jpeg',
                      headers:{'userToken':localStorage.getItem('token')}
                    }
                  for(var i = 0;i<this.Iamges.length;i++){
                      const fileTransfer: FileTransferObject = this.transfer.create();
                        let options: FileUploadOptions = {
                        fileKey: 'files',
                        fileName: 'name.'+ i +'jpg',
                        mimeType:' image/jpeg',
                        headers:{'userToken':localStorage.getItem('token')}
                      }
                      fileTransfer.upload(this.Iamges[i].url,APP_URL+ `phoneApplylend/v1/uploadFile/${id}`, options)
                      .then((data) => {
                        if(i == (this.Iamges[i].length - 1)){
                          this.navCtrl.push('BorrowManagePage',{tab:true});
                        }
                      }, (err) => {
                        this.navHttp.alert(err.response);
                      })
                  }
                }
              }
            }
          ]
        });
        confirm.present();
    }).catch(res => {
      this.http.presentToast('请联系管理员');
    })
    }
  }
   
}
