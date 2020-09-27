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
import { Router } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { take } from 'rxjs/operators';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sesion: boolean;
  user$: Observable<any> = this.userService.auth.user;
  userComplete: User;
  cart: cartProduct[];
  total: TotalCart;
  cartCount: number;
  searchTerm: string = '';
  productos: Product[];
  categorias: Category[];
  viewSearchPreview: boolean = false;
  onSearchPreview: boolean = false;
  loginModalDisplay: boolean = false;
  registerModalDisplay: boolean = false;  
  noPassModalDisplay: boolean = false;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private shareService: ShareInfoService,
    private prodSvc: ProductosService,
    public catsSvc: CatsService,
    private router: Router
  ) {
    this.sesion = false;
    shareService.changeEmitted$.subscribe((text: string) => {
      if(text.includes('cargar')){
        this.cargarTodos(); 
      }else if(text.includes('login')){
        this.loginModalDisplay = true;
      }
    });
    this.cargarTodos();
  }

  ngOnInit() {
    this.arranque();
  }

  arranque(){
    this.prodSvc.getProducts().pipe(take(1)).subscribe((prods: Product[]) => {
      this.productos = prods;
    });
    this.catsSvc.getCats().pipe(take(1)).subscribe((cats: Category[]) => {
      this.categorias = cats;
    });
    this.user$.subscribe((data) => {
      if (data) {
        this.userService.getUserData(data.uid).subscribe((data: User) => {
          this.userComplete = data;
        });
      }
    });
  }

  search(searchTerm: string) {
    if (searchTerm.length > 2) {
      this.colapsarMenu();
      this.router.navigateByUrl(`/search/${searchTerm}`);
      // let ls: {term: string}[] = JSON.parse(localStorage.getItem('search')) || [];
      // ls.push({term: searchTerm});
      // localStorage.setItem('search', JSON.stringify(ls));
      this.viewSearchPreview = false;
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: 'error',
        title: 'Termino demasiado corto',
      });
    } 
  }

  colapsarMenu(){
    $('#bs-example-navbar-collapse-1').collapse('hide')
  }

  logout(){
    this.userService.logout().then(()=>{
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Sesión cerrada correctamente'
      })
    })
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
    if (!this.onSearchPreview) {
      this.viewSearchPreview = false;
    }
  }

  cambiar(event: string) {
    if (event.includes('cerrar')) {
      if (event.includes('Login')) {
        this.loginModalDisplay = false;
      } else if (event.includes('NoPass')) {
        this.noPassModalDisplay = false;
      }else{
        this.registerModalDisplay = false;
      }
    } else {
      if (event.includes('Login')) {
        this.loginModalDisplay = false;
        this.registerModalDisplay = true;
      } else if (event.includes('NoPass')) {
        this.loginModalDisplay = false;
        this.noPassModalDisplay = true;
      }else{
        this.loginModalDisplay = true;
        this.registerModalDisplay = false;
        this.noPassModalDisplay = false;        
      }
    }
  }
}
