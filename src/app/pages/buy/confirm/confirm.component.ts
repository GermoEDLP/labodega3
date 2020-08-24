import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart.service';
import { cartProduct, Promo, TotalCart } from '../../../interfaces/interfaces';
import { ShareInfoService } from '../../../services/share-info.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['../info/info.component.css'],
})
export class ConfirmComponent implements OnInit {

  total: TotalCart;

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }
  data: any;
  charge: boolean = false;
  cart: cartProduct[];

  constructor(private router: Router, private cartSvc: CartService,
    private shareService: ShareInfoService,) {
    this.arranque();
  }

  ngOnInit(): void {}

  arranque() {
    if (localStorage.getItem('buyOrder')) {
      this.data = JSON.parse(localStorage.getItem('buyOrder'));
      let now = new Date().getTime();
      if (this.data.expire > now) {
        this.cargarTodos();
      } else {
        localStorage.removeItem('buyOrder');
        Swal.fire(
          'Orden Vencida',
          'Paso demasiado tiempo desde que empezaste la compra, por favor vuelve a iniciarla',
          'error'
        ).then(() => {
          this.router.navigateByUrl('/cart');
        });
      }
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  eliminar(id: number) {
    this.cartSvc.deleteProduct(id).then((resp) => {
      this.cargarTodos();
    });
  }

  cargarTodos() {
    this.shareService.emitChange('cargar');
    this.cartSvc.getAll().then((resp: cartProduct[]) => {
      this.cart = resp;
      this.cartSvc.calcTotal().then((tot) => {
        this.total = tot;
        this.charge = true;
        console.log(this.data);
        
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

  confirm(){
    console.log(this.data);
    
  }

}
