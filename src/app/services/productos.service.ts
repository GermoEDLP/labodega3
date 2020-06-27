import { Injectable } from '@angular/core';
import { Product } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  filePath: any;
  downloadURL: Observable<any>;
  collRef = this.db.collection('products');

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private userSvc: UserService
  ) {  
  }

  getProducts() {
    return this.collRef.valueChanges();
  }

  getProductById(id: string) {
    return this.collRef.doc(id).valueChanges();
  }

  getProductsByDate(){
    return this.db.collection('products', ref => 
      ref.orderBy('date').limit(2)
    ).valueChanges();
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
    return this.collRef.doc(prod.id).update(prod);
  }

  private newProduct(prod: Product) {
    const id = this.db.createId();
    prod.id = id;
    prod.date = new Date();
    prod.user = "A6T2rB8zfFZ4zMElt0JijMXGkFb2";
    prod.image = this.downloadURL;
    return this.collRef.doc(id).set(prod);
  }

  private uploadImage(image: any, prod?: Product, actualiza?: boolean) {
    const time = new Date().getTime();
    this.filePath = `images/${time}${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async(urlImage) => {
          this.downloadURL = await urlImage;
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
    return this.collRef.doc(id).delete();
  }


}
