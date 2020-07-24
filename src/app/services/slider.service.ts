import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private db: AngularFirestore) { }


  getSliders(){
    return this.db.collection('slider').valueChanges();
  }


}
