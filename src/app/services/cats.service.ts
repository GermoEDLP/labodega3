import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  collRef = this.db.collection('categories');

  constructor(private db: AngularFirestore) { }

  getCats(){
    return this.collRef.valueChanges();
  }

  getCatById(id: string){
    return this.collRef.doc(id).valueChanges();
  }

  newCategory(cat: Category){
    const id = this.db.createId();
    cat.id = id;
    return this.collRef.doc(cat.id).set(cat);
  }

  updateCategories(cats: Category[]){
    cats.forEach(cat=>{
      if(cat.id.includes('provisorio')){
        const id = this.db.createId();
        cat.id = id;
        this.collRef.doc(cat.id).set(cat);
      }else{
        this.collRef.doc(cat.id).update(cat);
      }
    })
  }



}
