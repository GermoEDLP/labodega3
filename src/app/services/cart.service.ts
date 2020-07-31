import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { cartProduct, Product } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private dbService: NgxIndexedDBService) {}

  saveProduct(product: cartProduct) {
    return this.dbService.add('cart', product);
  }

  getAll() {    
    return this.dbService.getAll('cart');
  }

  searchSame(idF: string){
    let encontro: any = false;
    return this.getAll().then((cart: cartProduct[])=>{
      cart.forEach(element => {
        if(element.idF == idF){
          encontro = element;
        }       
      });
    }).then(()=>{
      return encontro;
    })
  }

  addOne(id: number){
    return this.dbService.getByKey('cart', id)
    .then(prod=>{     
        prod.cant++;
        this.dbService.update('cart', prod);     
    });
  }

  restOne(id: number){
    return this.dbService.getByKey('cart', id)
      .then(prod=>{
        
        if(prod.cant == 1){    
          this.deleteProduct(id);
        }else{
          prod.cant--;
          this.dbService.update('cart', prod);
        };
      });
  }

  deleteAll() {}

  deleteProduct(id: number) {
   return  this.dbService.delete('cart', id);
  }

  calcTotal(){
    return this.getAll().then((prods: cartProduct[])=>{
      let totals = {
        subtotal: 0,
        total: 0
      };
      prods.forEach((prod: cartProduct)=>{
        totals.total += (prod.cant * prod.price);
        totals.subtotal += (prod.cant * (prod.price * (1 - (prod.sale/100))));
      });      
      return totals;
    });
  }

  countAll(){
    let cant = 0;
    return this.getAll().then((prods: cartProduct[])=>{
      prods.forEach(prod=>{
        cant += prod.cant;
      });
    }).then(()=>{
      
      return cant;
    });
  }
}
