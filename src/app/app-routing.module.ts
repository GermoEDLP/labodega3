import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MayoresComponent } from './mayores/mayores.component';


const routes: Routes = [
  {path: 'mayores', component: MayoresComponent},
  {path: '**', component:MayoresComponent},

];


export const AppRoutingModule = RouterModule.forRoot(routes, {useHash: true});
