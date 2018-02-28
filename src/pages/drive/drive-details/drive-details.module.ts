import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriveDetailsPage } from './drive-details';

@NgModule({
  declarations: [
    DriveDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DriveDetailsPage),
  ],
  exports: [
    DriveDetailsPage
  ]
})
export class DriveDetailsPageModule {}
