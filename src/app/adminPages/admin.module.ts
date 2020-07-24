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
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import { CatListaProdPipe } from '../pipes/cat-lista-prod.pipe';
import { SliderComponent } from './slider/slider.component'



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
    CatListaProdPipe,
    SliderComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  exports:[
    AdminComponent,
    ProdListComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    StadisticsComponent,
    NewProductComponent,
    SettingsComponent
  ]
})
export class AdminModule { }
