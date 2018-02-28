import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackDetailsPage } from './feedback-details';

@NgModule({
  declarations: [
    FeedbackDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackDetailsPage),
  ],
  exports: [
    FeedbackDetailsPage
  ]
})
export class FeedbackDetailsPageModule {}
