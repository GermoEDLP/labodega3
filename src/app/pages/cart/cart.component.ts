import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import {
  cartProduct,
  TotalCart,
  subTotalCart,
  Promo,
} from '../../interfaces/interfaces';
import { ShareInfoService } from '../../services/share-info.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productos: cartProduct[];
  total: TotalCart;

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  constructor(
    private userSvc: UserService,
    private cartService: CartService,
    private shareService: ShareInfoService,
    private router: Router
  ) {
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
    this.shareService.emitChange('cargar');
    this.cartService.getAll().then((resp: cartProduct[]) => {
      this.productos = resp;
      this.cartService.calcTotal().then((tot) => {
        this.total = tot;
        console.log(tot);
      });
    });
  }

  hayPromo(idF: string) {
    let index = null;
    this.total.promo.forEach((promo: Promo, i) => {
      if (promo.prod.idF == idF && promo.sale) {
        index = i;
      }
    });
    return index;
  }

  mostrarInfoSale(promo: Promo, cant: number) {
    Swal.fire({
      title: 'Descripción cargo',
      width: '50%',
      html: `
      <table class="table table-striped">
              <tr>
                <th style="text-align: left">Concepto</th>
                <th style="text-align: left">Precio U.</th>
                <th style="text-align: left">Cant</th>
                <th style="text-align: left">Subtotal</th>
              </tr>
              <tr>
                <td style="text-align: left">Promo ${promo.sale.name}-${
        promo.sale.desc
      }</td>
                <td style="text-align: left">$ ${promo.sale.off}</td>
                <td style="text-align: left">${
                  Math.trunc(cant / promo.sale.cant) * promo.sale.cant
                }</td>
                <td style="text-align: left">$ ${
                  Math.trunc(cant / promo.sale.cant) *
                  promo.sale.off *
                  promo.sale.cant
                }</td>
              </tr>
              <tr>
                <td style="text-align: left">${promo.prod.name}</td>
                <td style="text-align: left">$ ${promo.prod.price}</td>
                <td style="text-align: left">${cant % promo.sale.cant}</td>
                <td style="text-align: left">$ ${
                  (cant % promo.sale.cant) * promo.prod.price
                }</td>
              </tr>
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th style="text-align: left">$ ${
                  Math.trunc(cant / promo.sale.cant) *
                    promo.sale.off *
                    promo.sale.cant +
                  (cant % promo.sale.cant) * promo.prod.price
                }</th>
              </tr>
            </table>
      `,
    });
  }

  checkear() {
    this.userSvc.auth.user.subscribe((data) => {
      if(data){
        // if(data.emailVerified){
          this.router.navigateByUrl('/buy/info');
        // }else{
        //   Swal.fire(
        //     'Email sin verificar',
        //     'Por favor verifique su email antes de proceder',
        //     'info'
        //   )
        // }
      }else{
        Swal.fire({
          title: 'Inicio de sesión',
          text: "Para poder continuar con la compra, debes tener una sesión iniciada.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Iniciar Sesión',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.shareService.emitChange('login');
          }
        })
      }
    });
  }
}
