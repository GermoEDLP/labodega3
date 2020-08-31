import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ProdListComponent } from './prod-list/prod-list.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ComponentsModule } from '../components/components.module';
import { ADMIN_ROUTES } from './admin.routes';
import { AppRoutingModule } from '../app-routing.module';
import { StadisticsComponent } from './stadistics/stadistics.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { SliderComponent } from './slider/slider.component'

//CK Editor
import { CKEditorModule, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { CommentsComponent } from './comments/comments.component';
import { SalesComponent } from './sales/sales.component';
import { SaleComponent } from './sale/sale.component';
import { ConfSaleComponent } from './conf-sale/conf-sale.component';



@NgModule({
  declarations: [
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
    ConfSaleComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  exports:[
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
    SaleComponent
  ]
})
export class AdminModule { }
