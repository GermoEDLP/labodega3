import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  collRef = this.db.collection('sales');

  constructor(private db: AngularFirestore) { }

  getAll(){
    return this.collRef.valueChanges();
  }

  getById(id: string){
    return this.collRef.doc(id).valueChanges();
  }



}
