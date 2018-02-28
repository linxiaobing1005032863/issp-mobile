import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriveDealPage } from './drive-deal';
import { SharedModule } from '../../../app/shared.module';
@NgModule({
  declarations: [
    DriveDealPage,
  ],
  imports: [
    IonicPageModule.forChild(DriveDealPage),
    SharedModule
  ],
  exports: [
    DriveDealPage
  ]
})
export class DriveDealPageModule { }
