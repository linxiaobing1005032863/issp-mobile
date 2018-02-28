import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriveReasonPage } from './drive-reason';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    DriveReasonPage,
  ],
  imports: [
    IonicPageModule.forChild(DriveReasonPage),
    SharedModule
  ],
  exports: [
    DriveReasonPage
  ]
})
export class DriveReasonPageModule {}
