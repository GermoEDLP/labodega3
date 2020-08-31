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
import { LoadingComponent } from './loading/loading.component';
import { LoadingMainComponent } from './loading-main/loading-main.component';
import { LoadingImageComponent } from './loading-image/loading-image.component';

// Pagination
import {NgxPaginationModule} from 'ngx-pagination';

//Pipes
import { SliderShowPipe } from '../pipes/slider-show.pipe';
import { CommentShowPipe } from '../pipes/comment-show.pipe';
import { FirestoreDatePipe } from '../pipes/firestore-date.pipe';
import { SearchPipe } from '../pipes/search.pipe';
import { SearchCatPipe } from '../pipes/search-cat.pipe';
import { CatListaProdPipe } from '../pipes/cat-lista-prod.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoPassResetComponent } from './no-pass-reset/no-pass-reset.component';
import { VentasPipe } from '../pipes/ventas.pipe';
import { SaleTableComponent } from './sale-table/sale-table.component';

import { NgpSortModule } from "ngp-sort-pipe";
import { SaleModalComponent } from './sale-modal/sale-modal.component';
import { InfoVentasPipe } from '../pipes/info-ventas.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ProdCardComponent,
    BreadcrumbsComponent,
    CarrouselComponent,
    LoadingComponent,
    LoadingMainComponent,
    LoadingImageComponent,
    LoginComponent,
    RegisterComponent,
    SearchPipe,
    SearchCatPipe,
    CatListaProdPipe,
    SliderShowPipe,
    CommentShowPipe,
    FirestoreDatePipe,
    VentasPipe,
    InfoVentasPipe,
    NoPassResetComponent,
    SaleTableComponent,
    SaleModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgxPaginationModule,
    NgpSortModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ProdCardComponent,
    BreadcrumbsComponent,
    CarrouselComponent,
    LoadingComponent,
    LoadingMainComponent,
    LoadingImageComponent,
    LoginComponent,
    RegisterComponent,
    SearchCatPipe,
    CatListaProdPipe,
    SearchPipe,
    SliderShowPipe,
    VentasPipe,
    InfoVentasPipe,
    CommentShowPipe,
    FirestoreDatePipe,
    SaleTableComponent
  ]
})
export class ComponentsModule { }
