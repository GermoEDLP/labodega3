import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import {
  cartProduct,
  TotalCart,
  Product,
  Category,
} from '../../interfaces/interfaces';
import { ShareInfoService } from '../../services/share-info.service';
import { ProductosService } from '../../services/productos.service';
import { CatsService } from '../../services/cats.service';

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
  categorias: Category[];
  viewSearchPreview: boolean = false;
  onSearchPreview: boolean = false;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private shareService: ShareInfoService,
    private prodSvc: ProductosService,
    private catsSvc: CatsService
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
    this.catsSvc.getCats().subscribe((cats: Category[]) => {
      this.categorias = cats;
    });
  }

  search(searchTerm) {
    console.log(searchTerm);
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

  focus() {
    this.viewSearchPreview = true;
  }
  blur(event) {
    if(!this.onSearchPreview){
      this.viewSearchPreview = false;
    }
  }
}
