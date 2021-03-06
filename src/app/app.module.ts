// Modulos Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// Modulos propios
import { PagesModule } from './pages/pages.module';
import { AdminModule } from './adminPages/admin.module';

// Modulos externos
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

// Componentes
import { MayoresComponent } from './mayores/mayores.component';
import { AppComponent } from './app.component';

// IndexDB
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

// Otros
import { environment } from '../environments/environment';

const dbConfig: DBConfig =  {
  name: 'LaBodega',
  version: 1,
  objectStoresMeta: [{
    store: 'cart',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'cant', keypath: 'cant', options: { unique: false } },
      { name: 'price', keypath: 'price', options: { unique: false } },
      { name: 'desc', keypath: 'desc', options: { unique: false } },
      { name: 'sale', keypath: 'sale', options: { unique: false } }       
    ]
  }]
}


@NgModule({
  declarations: [
    AppComponent,
    MayoresComponent,
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
    NgxIndexedDBModule.forRoot(dbConfig),

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
