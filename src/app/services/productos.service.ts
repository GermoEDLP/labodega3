import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  filePath: any;
  downloadURL: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getProducts() {
    return this.db.collection('products').valueChanges();
  }

  getProductById(id: string) {
    return this.db.collection('products').doc(id).valueChanges();
  }

  creaProductoYSubeImagen(prod: Product, image: any, noFoto: boolean){
    if(noFoto){
      this.downloadURL = image;
      return this.newProduct(prod);
    }else{
      this.uploadImage(image, prod, false)
      return new Promise(res=>{
        return res('ok');
      }) 
    }
  }

  actualizaProductoYSubeImagen(prod: Product, image: any, noFoto: boolean){
    if(noFoto){
      this.downloadURL = image;
      
      return this.actualizaProducto(prod);
    }else{
      this.uploadImage(image, prod, true);
      return new Promise(res=>{
        return res('ok');
      })
      
    }
  }

  actualizaProducto(prod: Product){    
    prod.image = this.downloadURL;
    return this.db.collection('products').doc(prod.id).update(prod);
  }

  private newProduct(prod: Product) {
    const id = this.db.createId();
    prod.id = id;
    prod.image = this.downloadURL;
    return this.db.collection('products').doc(id).set(prod);
  }

  private uploadImage(image: any, prod?: Product, actualiza?: boolean) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async(urlImage) => {
          this.downloadURL = await urlImage;
          console.log('URL_IMAGE', urlImage);
          if(actualiza){
            this.actualizaProducto(prod);
          }else{
            this.newProduct(prod);
          }
        });
      })
    ).subscribe()
  }

  borrarProductoPorId(id: string){
    return this.db.collection('products').doc(id).delete();
  }


}
