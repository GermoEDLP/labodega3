// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { DBConfig } from 'ngx-indexed-db';
 
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDgNCRh2nX_34HrUqFaAjaQ-2CcTB40vBk",
    authDomain: "labodegabebidas.firebaseapp.com",
    databaseURL: "https://labodegabebidas.firebaseio.com",
    projectId: "labodegabebidas",
    storageBucket: "labodegabebidas.appspot.com",
    messagingSenderId: "564588185513",
    appId: "1:564588185513:web:54d525fb3d0a35df7b66b8"
  },
  dbConfig : {
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
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
