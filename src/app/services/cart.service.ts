import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { cartProduct, Product, Sale, TotalCart, subTotalCart } from '../interfaces/interfaces';

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
      let totals: TotalCart = {
        subtotal: 0,
        total: 0,
        promo: []
      };
      prods.forEach((prod: cartProduct)=>{
        totals.total += (prod.cant * prod.price);      
        let sub: subTotalCart[] = [];
        sub.push({pesos: totals.total, promo: undefined});
        prod.sale.forEach((sale: Sale)=>{
          if(prod.cant >= sale.cant && sale.show){
            sub.push({pesos: (sale.off * (prod.cant-(prod.cant%sale.cant))+(prod.price * (prod.cant%sale.cant))), promo: sale});
          }
        })        
        totals.subtotal += this.mejorPromo(sub).subtotal;
        totals.promo.push({prod: prod, sale: sub[this.mejorPromo(sub).pos].promo, subtotal: sub[this.mejorPromo(sub).pos].pesos });
      });      
      return totals;
    });
  }

  mejorPromo(sub: subTotalCart[]){
    let min = {min: 100000000, pos: 0};
    sub.forEach((sub: subTotalCart, index: number)=>{
      if(sub.pesos<min.min){
        min.min = sub.pesos;
        min.pos = index
      }
    });
    return {subtotal:min.min, pos: min.pos}
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
