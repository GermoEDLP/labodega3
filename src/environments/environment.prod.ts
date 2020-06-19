export const environment = {
  production: true,
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
        { cant: 'cant', keypath: 'cant', options: { unique: false } },
        { cant: 'price', keypath: 'price', options: { unique: false } },
        { cant: 'desc', keypath: 'desc', options: { unique: false } },
        { cant: 'sale', keypath: 'sale', options: { unique: false } }       
      ]
    }]
  }
};
