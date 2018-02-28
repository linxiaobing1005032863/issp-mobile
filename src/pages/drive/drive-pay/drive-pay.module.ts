import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrivePayPage } from './drive-pay';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    DrivePayPage,
  ],
  imports: [
    IonicPageModule.forChild(DrivePayPage),
    SharedModule
  ],
  exports: [
    DrivePayPage
  ]
})
export class DrivePayPageModule { }
