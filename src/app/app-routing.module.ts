import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MayoresComponent } from './mayores/mayores.component';
import { AdminComponent } from './adminPages/admin.component';
import { ProdListComponent } from './adminPages/prod-list/prod-list.component';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { StadisticsComponent } from './adminPages/stadistics/stadistics.component';
import { NewProductComponent } from './adminPages/new-product/new-product.component';
import { SettingsComponent } from './adminPages/settings/settings.component';

const routes: Routes = [
  { path: 'mayores', component: MayoresComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {path: 'list', component: ProdListComponent},
      {path: 'stadistics', component: StadisticsComponent},
      {path: 'newProd/:cod', component: NewProductComponent},
      {path: 'settings', component: SettingsComponent},
      {path: '', component:StadisticsComponent}
    ]
  },
  { path: '**', component: MayoresComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
