import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriveMailingPage } from './drive-mailing';

@NgModule({
  declarations: [
    DriveMailingPage,
  ],
  imports: [
    IonicPageModule.forChild(DriveMailingPage),
  ],
  exports: [
    DriveMailingPage
  ]
})
export class DriveMailingPageModule {}
