import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(private db: AngularFirestore) { }

  getCats(){
    return this.db.collection('categories').valueChanges();
  }



}
