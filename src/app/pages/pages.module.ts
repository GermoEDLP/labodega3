import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { ComponentsModule } from '../components/components.module';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProductComponent,
    PagesComponent,
    CartComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    FormsModule,
    AppRoutingModule,
    ComponentsModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    ProductComponent,
    CartComponent,
    SearchComponent
  ]
})
export class PagesModule { }
