import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackAddPage } from './feedback-add';

@NgModule({
  declarations: [
    FeedbackAddPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackAddPage),
  ],
  exports: [
    FeedbackAddPage
  ]
})
export class FeedbackAddPageModule {}
