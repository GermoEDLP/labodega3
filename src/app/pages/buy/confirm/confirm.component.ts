import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart.service';
import { cartProduct, Promo, TotalCart, Venta } from '../../../interfaces/interfaces';
import { ShareInfoService } from '../../../services/share-info.service';
import { PayService } from '../../../services/pay.service';
import { Observable } from 'rxjs';

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
  data: Venta;
  charge: boolean = false;
  cart: cartProduct[];

  constructor(
    private router: Router,
    private cartSvc: CartService,
    private shareService: ShareInfoService,
    private paySvc: PayService
  ) {
    this.arranque();
  }

  ngOnInit(): void {}

  arranque() {
    if (localStorage.getItem('buyOrder')) {
      this.data = JSON.parse(localStorage.getItem('buyOrder'));
      if (this.checkExpirancy()) {
        this.cargarTodos();
      }
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  checkExpirancy(): boolean{
    let now = new Date().getTime();
      if (this.data.expire > now) {
        return true;
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

  confirm() {
    if(!this.checkExpirancy()){
      return;
    }
    this.data.products = this.total;
    console.log(this.data);
    Swal.fire({
      icon: 'info',
      title: 'Aguarde un momento por favor, estamos procesando su solicitud',
      showConfirmButton: false
    })
    this.paySvc.newVenta(this.data).then((data: Observable<any>)=>{
      data.subscribe((data)=>{
        Swal.close();
        let mensaje = this.mensajePorMetodoDePago(this.data, data);
        if(this.data.payMethod.includes('mp')){
          window.open(data.url.init_point);
        }
        Swal.fire(mensaje).then(()=>{
          this.cartSvc.deleteAll();
          localStorage.removeItem('buyOrder');
          this.router.navigateByUrl('/home');
        });
      })
    })
  }

  mensajePorMetodoDePago(venta: Venta, data: any){
      let response;
      switch (venta.payMethod) {
        case 'cash':
          response = {
            title: 'Pedido creado',
            text: 'Recibira un mail cuando hayamos preparado su pedido y pueda buscarlo en sucursal. Muchas gracias.',
            icon: 'success'
          }
          break;
        case 'bank':
          response = {
            title: 'Pedido creado',
            text: 'Se ha enviado un correo al mail declarado con los datos bancarios de la empresa. Una vez haya realizado el pago, se confirmará la compra. Muchas gracias.',
            icon: 'success'
          }
          break;
        case 'mp':
          response = {
            title: 'Pedido creado',
            html: `Se debería haber abierto una nueva pestaña a la pagina de MercadoPago para poder realizar el pago correspondiente, de no ser así, el siguiente link lo redirigirá. Muchas gracias.</p>
            <a href="${data.url.init_point}" target="_blank">Link MercadoPago</a>`,
            icon: 'success'
          }
          break;
      
        default:
          response = {
            title: 'Error al realizar el pedido',
            text: 'Por favor intentelo nuevamente o comuniquese con nuestro mail de ayuda: info@labodega.com',
            icon: 'error'
          }
          break;
      }
      return response;
    }

}
