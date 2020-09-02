import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Venta } from '../interfaces/interfaces';

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

  getAllFinal(){
    return this.db.collection('sales', ref => ref.where('state', '==', 'finalize')).valueChanges();
  }

}
