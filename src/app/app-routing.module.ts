import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MayoresComponent } from './mayores/mayores.component';
import { AdminComponent } from './adminPages/admin.component';
import { ProdListComponent } from './adminPages/prod-list/prod-list.component';
import { StadisticsComponent } from './adminPages/stadistics/stadistics.component';
import { NewProductComponent } from './adminPages/new-product/new-product.component';
import { SettingsComponent } from './adminPages/settings/settings.component';
import { CategoriesComponent } from './adminPages/categories/categories.component';
import { SliderComponent } from './adminPages/slider/slider.component';
import { CommentsComponent } from './adminPages/comments/comments.component';
import { SalesComponent } from './adminPages/sales/sales.component';
import { SaleComponent } from './adminPages/sale/sale.component';
import { ConfSaleComponent } from './adminPages/conf-sale/conf-sale.component';

const routes: Routes = [
  { path: 'mayores', component: MayoresComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'list', component: ProdListComponent},
      {path: 'stadistics', component: StadisticsComponent},
      {path: 'newProd/:cod', component: NewProductComponent},      
      {path: 'categories', component: CategoriesComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'slider', component: SliderComponent},
      {path: 'comment', component: CommentsComponent},
      {path: 'sales', component: SalesComponent},
      {path: 'sale/:id', component: SaleComponent},
      {path: 'confSale', component: ConfSaleComponent},
      {path: '', component:StadisticsComponent}
    ]
  },
  { path: '**', component: MayoresComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
