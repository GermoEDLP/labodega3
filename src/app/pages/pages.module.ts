import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ProductComponent,
    PagesComponent
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
    ProductsComponent,
    ProductComponent
  ]
})
export class PagesModule { }
