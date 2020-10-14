//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modulos propios
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { BuyModule } from './buy/buy.module';
import { PipesModule } from '../pipes/pipes.module';

//Modulos externos
import { RecaptchaModule } from 'ng-recaptcha';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//Componentes
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { PagesComponent } from './pages.component';

//Otros
import { PAGES_ROUTES } from './pages.routes';



const components = [
  HomeComponent,
  ProductComponent,
  PagesComponent,
  CartComponent,
  SearchComponent,
  ProfileComponent,
  ContactComponent
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
    BuyModule,
    PipesModule,
    RecaptchaModule,
    Ng2SearchPipeModule
  ],
  exports: components
})
export class PagesModule { }
