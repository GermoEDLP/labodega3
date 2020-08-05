import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { cartProduct, TotalCart, Product } from '../../interfaces/interfaces';
import { ShareInfoService } from '../../services/share-info.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sesion: boolean;
  user$: Observable<any> = this.userService.auth.user;
  cart: cartProduct[];
  total: TotalCart;
  cartCount: number;
  searchTerm: string = '';
  productos: Product[];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private shareService: ShareInfoService,
    private prodSvc: ProductosService
  ) {
    this.sesion = false;
    shareService.changeEmitted$.subscribe((text) => {
      this.cargarTodos();
    });
    this.cargarTodos();
  }

  ngOnInit() {
    this.prodSvc.getProducts().subscribe((prods: Product[]) => {
      this.productos = prods;
    });
  }

  search() {
    // TODO hacer el buscador
  }

  logout() {
    this.userService.logout();
  }

  cargarTodos() {
    this.cartService.getAll().then((resp: cartProduct[]) => {
      this.cart = resp;
      this.cartService.calcTotal().then((tot) => {
        this.total = tot;
        this.cartService.countAll().then((count) => {
          this.cartCount = count;
        });
      });
    });
  }

  ver(){
    console.log(this.searchTerm);
    
  }
}
