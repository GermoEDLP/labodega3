import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { ComponentsModule } from '../components/components.module';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { BuyModule } from './buy/buy.module';
import { ProfileComponent } from './profile/profile.component';

const components = [
  HomeComponent,
  AboutComponent,
  ProductComponent,
  PagesComponent,
  CartComponent,
  SearchComponent,
  ProfileComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    BuyModule
  ],
  exports: components
})
export class PagesModule { }
