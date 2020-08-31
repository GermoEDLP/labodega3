import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import {
  cartProduct,
  Product,
  Sale,
  TotalCart,
  subTotalCart,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private dbService: NgxIndexedDBService) {}

  saveProduct(product: cartProduct) {
    this.expires();
    return this.dbService.add('cart', product);
  }

  getAll() {
    this.expires();
    return this.dbService.getAll('cart');
  }

  searchSame(idF: string) {
    let encontro: any = false;
    return this.getAll()
      .then((cart: cartProduct[]) => {
        cart.forEach((element) => {
          if (element.idF == idF) {
            encontro = element;
          }
        });
      })
      .then(() => {
        return encontro;
      });
  }

  addOne(id: number, cant?: number) {
    this.expires();
    if (!cant) {
      cant = 1;
    }
      return this.dbService.getByKey('cart', id).then((prod) => {
      prod.cant = prod.cant + cant;
      this.dbService.update('cart', prod);
    });
  }

  restOne(id: number) {
    this.expires();
    return this.dbService.getByKey('cart', id).then((prod) => {
      if (prod.cant == 1) {
        this.deleteProduct(id);
      } else {
        prod.cant--;
        this.dbService.update('cart', prod);
      }
    });
  }

  deleteAll() {
    localStorage.removeItem('cartExpires');
    return this.dbService.clear('cart');
  }

  deleteProduct(id: number) {
    return this.dbService.delete('cart', id);
  }

  calcTotal() {
    this.expires();
    return this.getAll().then((prods: cartProduct[]) => {
      let totals: TotalCart = {
        subtotal: 0,
        total: 0,
        promo: [],
      };
      prods.forEach((prod: cartProduct) => {
        let sub: subTotalCart[] = [];
        sub.push({ pesos: (prod.cant * prod.price), promo: {show: false, name: 'Only', off: (prod.cant * prod.price), cant: 1, desc: 'Only'} });
        prod.sale.forEach((sale: Sale) => {
          if (prod.cant >= sale.cant && sale.show) {
            sub.push({
              pesos:
                sale.off * (prod.cant - (prod.cant % sale.cant)) +
                prod.price * (prod.cant % sale.cant),
              promo: sale,
            });
          }
        });
        totals.total = totals.total + (prod.cant * prod.price);
        totals.subtotal = totals.subtotal + this.mejorPromo(sub).subtotal;
        totals.promo.push({
          prod: prod,
          sale: sub[this.mejorPromo(sub).pos].promo,
          subtotal: sub[this.mejorPromo(sub).pos].pesos,
        });
      });
      return totals;
    });
  }

  mejorPromo(sub: subTotalCart[]) {
    let min = { min: 100000000, pos: 0 };
    sub.forEach((sub: subTotalCart, index: number) => {
      if (sub.pesos < min.min) {
        min.min = sub.pesos;
        min.pos = index;
      }
    });
    return { subtotal: min.min, pos: min.pos };
  }

  countAll() {
    let cant = 0;
    return this.getAll()
      .then((prods: cartProduct[]) => {
        prods.forEach((prod) => {
          cant += prod.cant;
        });
      })
      .then(() => {
        return cant;
      });
  }

  expires(){
    let now = new Date().getTime();
    if(localStorage.getItem('cartExpires')){
      if(Number(localStorage.getItem('cartExpires')) < now){
        this.deleteAll();
      }else{
        this.updateExpires();
      }
    }else{
      this.updateExpires();
    }
  }

  updateExpires(){
    let now = new Date().getTime();
    now = now + (6*60*60*1000);
    localStorage.removeItem('cartExpires');
    localStorage.setItem('cartExpires', String(now));
  }
}
