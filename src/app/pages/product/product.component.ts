import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { Product, cartProduct } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  cod: string;
  product: Product;
  view = false;

  list: number[] = [1, 2, 3, 4, 5, 6, 10, 12, 15];

  @ViewChild('cant') cant: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private prodScv: ProductosService,
    private router: Router,
    private cartSvc: CartService,
    private shareService: ShareInfoService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.arranque();
      }
    });
  }

  ngOnInit(): void {}

  arranque() {
    this.cod = this.route.snapshot.paramMap.get('cod');
    this.prodScv.getProductById(this.cod).subscribe((prod: Product) => {
      if (prod) {
        this.product = prod;
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  agregar(cantidad?: number) {
    let element: any;
    let cant: number;
    if (!cantidad) {
      cant = Number((<HTMLInputElement>document.getElementById('cant')).value);
    } else {
      cant = cantidad;
    }
    this.cartSvc
      .searchSame(this.product.id)
      .then((elemento) => {
        element = elemento;
      })
      .then(() => {
        if (element) {
          this.cartSvc.addOne(element.id, cant).then(() => {
            this.shareService.emitChange('Hola mundo');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
            });

            Toast.fire({
              icon: 'success',
              title: this.product.name + ' agregado correctamente',
            });
          });
        } else {
          let itemCart: cartProduct = {
            name: this.product.name,
            cant: cant,
            price: this.product.price,
            sale: this.product.sale,
            desc: this.product.desc,
            img: this.product.image,
            idF: this.product.id,
          };
          this.cartSvc.saveProduct(itemCart).then(() => {
            this.shareService.emitChange('Hola mundo');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

            Toast.fire({
              icon: 'success',
              title: this.product.name + ' agregado correctamente',
            });
          });
        }
      });
    //
  }

  change() {
    this.view = true;
  }
}
