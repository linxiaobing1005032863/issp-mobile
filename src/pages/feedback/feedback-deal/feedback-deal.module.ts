import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackDealPage } from './feedback-deal';
import { SharedModule } from '../../../app/shared.module';

@NgModule({
  declarations: [
    FeedbackDealPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackDealPage),
    SharedModule,
  ],
  exports: [
    FeedbackDealPage
  ]
})
export class FeedbackDealPageModule {}
