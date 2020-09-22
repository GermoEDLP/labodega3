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
import { GraficosComponent } from './graficos/graficos.component';

import { ChartsModule } from 'ng2-charts';
import { MenuComponent } from './menu/menu.component';
import { ShowMegaMenuDirective } from './directives/show-mega-menu.directive';
import { HideMegaMenuDirective } from './directives/hide-mega-menu.directive';
import { CleanCatPipe } from '../pipes/clean-cat.pipe';

const componentes = [
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
  CleanCatPipe,
  CatListaProdPipe,
  SliderShowPipe,
  CommentShowPipe,
  FirestoreDatePipe,
  VentasPipe,
  InfoVentasPipe,
  NoPassResetComponent,
  SaleTableComponent,
  SaleModalComponent,
  GraficosComponent,
  MenuComponent,
  ShowMegaMenuDirective,
  HideMegaMenuDirective
]

@NgModule({
  declarations: componentes,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    NgxPaginationModule,
    NgpSortModule,
    ChartsModule
  ],
  exports: componentes
})
export class ComponentsModule { }
