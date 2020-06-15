import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

import { FormsModule } from '@angular/forms'
import { ProdCardComponent } from '../components/prod-card/prod-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ProductComponent,
    ProdCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ProductComponent
  ]
})
export class PagesModule { }
