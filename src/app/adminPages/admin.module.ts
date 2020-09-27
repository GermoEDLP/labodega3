//Modulos de Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Modulos propios
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';

//Modulos externos
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

//Componentes
import { AdminComponent } from './admin.component';
import { ProdListComponent } from './prod-list/prod-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { StadisticsComponent } from './stadistics/stadistics.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoriesComponent } from './categories/categories.component';
import { SliderComponent } from './slider/slider.component'
import { CommentsComponent } from './comments/comments.component';
import { SalesComponent } from './sales/sales.component';
import { SaleComponent } from './sale/sale.component';
import { ConfSaleComponent } from './conf-sale/conf-sale.component';
import { HistoryComponent } from './history/history.component';

//Otros

const adminComponents = [
  AdminComponent,
  ProdListComponent,
  AdminHeaderComponent,
  AdminSidebarComponent,
  StadisticsComponent,
  NewProductComponent,
  SettingsComponent,
  CategoriesComponent,
  SliderComponent,
  CommentsComponent,
  SalesComponent,
  SaleComponent,
  ConfSaleComponent,
  HistoryComponent
];

@NgModule({
  declarations: adminComponents,
  imports: [
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    PipesModule
  ],
  exports:adminComponents
})
export class AdminModule { }
