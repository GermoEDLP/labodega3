import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MayoresComponent } from './mayores/mayores.component';
import { RouterModule } from '@angular/router';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

// IndexDB
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { AdminComponent } from './adminPages/admin.component';
import { AdminModule } from './adminPages/admin.module';





@NgModule({
  declarations: [
    AppComponent,
    MayoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    AdminModule,
    SweetAlert2Module.forRoot(),
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxIndexedDBModule.forRoot(environment.dbConfig),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
