import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { BuyComponent } from './buy.component';
import { PAGES_ROUTES } from '../pages.routes';
import { ShippComponent } from './shipp/shipp.component';
import { PayComponent } from './pay/pay.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { StepsComponent } from './steps/steps.component';

import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    BuyComponent,
    InfoComponent,
    ShippComponent,
    PayComponent,
    ConfirmComponent,
    StepsComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    ReactiveFormsModule,
    ComponentsModule,
    RecaptchaModule
  ],
  exports: [
    BuyComponent,
    InfoComponent,
    ShippComponent,
    PayComponent,
    ConfirmComponent,
    StepsComponent
  ]
})
export class BuyModule { }
