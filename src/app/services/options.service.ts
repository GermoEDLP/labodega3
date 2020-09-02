import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Options } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private db: AngularFirestore) { }

  getOptions(){
    return this.db.collection('options').doc('admin').valueChanges();
  }

  updateOptions(options: Options){
    return this.db.collection('options').doc('admin').update(options);
  }

  
}
