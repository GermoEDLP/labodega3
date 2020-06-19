import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { cartProduct } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sesion: boolean;
  user$: Observable<any> = this.userService.auth.user;
  cart: cartProduct[];
  total: number;
  subtotal: number;
  cartCount: number;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {
    this.sesion = false;    
    this.cargarTodos();
  }

  async ngOnInit() {
    await this.userService.currentUser();
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
      this.cartService.calcTotal().then(tot=>{
        this.total = tot.total;
        this.subtotal = tot.subtotal;
        this.cartService.countAll().then(count=>{
          this.cartCount = count;
        })              
      });
    });
  }
}
