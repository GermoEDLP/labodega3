import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProdCardComponent } from './prod-card/prod-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CarrouselComponent } from './carrousel/carrousel.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ProdCardComponent,
    BreadcrumbsComponent,
    CarrouselComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ProdCardComponent,
    BreadcrumbsComponent,
    CarrouselComponent,
    LoginComponent
  ]
})
export class ComponentsModule { }
