import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriveAddPage } from './drive-add';
import { SharedModule } from '../../../app/shared.module'
@NgModule({
  declarations: [
    DriveAddPage,
  ],
  imports: [
    IonicPageModule.forChild(DriveAddPage),
    SharedModule
  ],
  exports: [
    DriveAddPage
  ]
})
export class DriveAddPageModule { }
