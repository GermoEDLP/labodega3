//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Modulos propios
import { PipesModule } from '../pipes/pipes.module';

//Modulos externos
import {NgxPaginationModule} from 'ngx-pagination';
import { NgpSortModule } from "ngp-sort-pipe";
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//Componentes
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProdCardComponent } from './prod-card/prod-card.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingMainComponent } from './loading-main/loading-main.component';
import { LoadingImageComponent } from './loading-image/loading-image.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoPassResetComponent } from './no-pass-reset/no-pass-reset.component';
import { SaleTableComponent } from './sale-table/sale-table.component';
import { SaleModalComponent } from './sale-modal/sale-modal.component';
import { GraficosComponent } from './graficos/graficos.component';
import { MenuComponent } from './menu/menu.component';
import { RecomendComponent } from './recomend/recomend.component';
import { MenuCatNewProdComponent } from './menu-cat-new-prod/menu-cat-new-prod.component';

//Directivas
import { ShowMegaMenuDirective } from './directives/show-mega-menu.directive';
import { HideMegaMenuDirective } from './directives/hide-mega-menu.directive';
import { AvatarDirective } from '../directives/avatar.directive';

//Otros

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
  NoPassResetComponent,
  SaleTableComponent,
  SaleModalComponent,
  GraficosComponent,
  MenuComponent,
  RecomendComponent,
  ShowMegaMenuDirective,
  HideMegaMenuDirective,
  AvatarDirective,
  MenuCatNewProdComponent
]

@NgModule({
  declarations: componentes,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxPaginationModule,
    NgpSortModule,
    ChartsModule,
    PipesModule,
    Ng2SearchPipeModule
  ],
  exports: componentes
})
export class ComponentsModule { }
