import { Injectable } from '@angular/core';
import { Product, Category, Sale } from '../interfaces/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { filter, finalize, map, take } from 'rxjs/operators';
import { UserService } from './user.service';
import { CatsService } from './cats.service';
import { data } from 'jquery';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  filePath: any;
  downloadURL: Observable<any>;
  collRef = this.db.collection('products');
  categorias: Category[];

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private userSvc: UserService,
    private catsSvc: CatsService
  ) {  
    catsSvc.getCats().subscribe(async(cats: Category[]) => {
      this.categorias = await cats;
    })
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

  getProductsForRecomend(order: string, cant: number){
      return this.db.collection('products', ref => ref.orderBy(order).limit(cant)).valueChanges();
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

  variarStock(id: string, cant: number, suma: boolean){
    if(suma){
      return this.db.collection('products').doc(id).update({
        stock: firebase.firestore.FieldValue.increment(cant)
      })
    }else{
      return this.db.collection('products').doc(id).update({
        stock: firebase.firestore.FieldValue.increment(-cant)
      })
    }
  }

  cambiarEstadoVisual(id: string, state: boolean){
    return this.collRef.doc(id).update({
      show: !state
    });
  }

  cargarLista(prod: any){
    let cat: string[];
    let sale: Sale[];
    if(prod.subcat == ''){
      cat = [prod.cat]
    }else{
      cat = [prod.cat, prod.subcat]
    }
    if(prod.price_box == ''){
      sale = [];
    }else{
      sale = [        
        {
          cant: prod.cant,
          off: parseFloat(prod.price_box),
          show: true,
          name: 'Precio',
          desc: 'x caja'
        }
      ]
    }

    let prodSet: Product = {
      id: this.db.createId(),
      name: prod.name,
      cat: cat,
      date: new Date(),
      desc: prod.desc,
      image: 'https://firebasestorage.googleapis.com/v0/b/labodegabebidas.appspot.com/o/images%2Fproducto-sin-imagen.png?alt=media&token=e65817b4-1d74-4f9b-80a5-3bb155a4a3f1',
      order: true,
      price: parseFloat(prod.price),
      show: true,
      stock: 0,
      sale: sale
    }

    return this.db.collection('products').doc(prodSet.id).set(prodSet);
  }

  actualizaProducto(prod: Product){    
    prod.image = this.downloadURL;
    return this.collRef.doc(prod.id).update(prod);
  }

  private async newProduct(prod: Product) {
    const id = this.db.createId();
    prod.id = id;
    prod.date = new Date();
    prod.user = "A6T2rB8zfFZ4zMElt0JijMXGkFb2";
    prod.image = this.downloadURL;
    console.log(prod);
    
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

  getProductByCat(cat: string){
    return this.db.collection('products', ref => ref.where('cat', 'array-contains', cat)).valueChanges();
  }

  categoriasPorNombre(names: string[]): string[]{
    let catsFinal: string[] = [];
    names.forEach(name =>{
      if(this.categorias.find(cat => cat.name == name) !== undefined){
        catsFinal.push(this.categorias.find(cat => cat.name == name).id);
      }else{
        let subcat;
        this.categorias.forEach(cat => {
          cat.subs.forEach((sub, index)=>{
            if(sub == name){
              subcat = cat.id + 'subs' + index;
            }
          })
        })
        catsFinal.push(subcat);
      }
    })
    return catsFinal;
  }

  ultimosProds(){
    return this.db.collection('products', ref => ref.orderBy('date', 'desc')).valueChanges();
  }


}
