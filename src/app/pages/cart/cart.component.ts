import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as jQuery from 'jquery';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output('reset') resetCart: EventEmitter<any> = new EventEmitter();

  product: cartProduct = {
    name: 'Alma mora',
    desc: 'Vino. 750ml',
    cant: 2,
    price: 100,
    sale: 15,
  };

  productos: cartProduct[];
  total: number;
  subtotal: number;

  scrHeight: any;
  scrWidth: any;


  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  constructor(private us: UserService, private cartService: CartService) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.cargarTodos();
  }

  agregarProducto(product: cartProduct) {
    this.cartService.saveProduct(product);
  }

  restar(id: number) {
    this.cartService.restOne(id).then((resp) => {
      this.cargarTodos();
    });
  }
  sumar(id: number) {
    this.cartService.addOne(id).then((resp) => {
      this.cargarTodos();
    });
  }

  eliminar(id: number) {
    this.cartService.deleteProduct(id).then((resp) => {
      this.cargarTodos();
    });
  }

  cargarTodos() {
    this.resetCart.emit('Hola mundo');    
    this.cartService.getAll().then((resp: cartProduct[]) => {
      this.productos = resp;
      this.cartService.calcTotal().then((tot) => {
        this.total = tot.total;
        this.subtotal = tot.subtotal;
      });
    });
  }
}
