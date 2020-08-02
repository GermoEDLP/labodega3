import { Component, OnInit, Input } from '@angular/core';
import { Product, cartProduct, Sale } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import { element } from 'protractor';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['prod-card.component.css'],
})
export class ProdCardComponent implements OnInit {
  carga = false;

  @Input() items: Product[];

  constructor(
    private cartSvc: CartService,
    private shareService: ShareInfoService
  ) {}

  ngOnInit(): void {}

  agregarACarrito(item: Product) {
    let element: any;
    this.cartSvc
      .searchSame(item.id)
      .then((elemento) => {
        element = elemento;
      })
      .then(() => {
        if (element) {
          this.cartSvc.addOne(element.id).then(()=>{
            this.shareService.emitChange('Hola mundo');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

            Toast.fire({
              icon: 'success',
              title: item.name + ' agregado correctamente',
            });
          });
          
        } else {
          let itemCart: cartProduct = {
            name: item.name,
            cant: 1,
            price: item.price,
            img: item.image,
            sale: item.sale,
            desc: item.desc,
            idF: item.id,
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
              title: item.name + ' agregado correctamente',
            });
          });
        }
      });
    //
  }

  ofertaProducto(sales: Sale[]): Sale{
    let saleProd: Sale;
    sales.forEach((sale: Sale)=>{
      if(sale.cant < 5 && sale.show){
        saleProd = sale;
      }
    })
    return saleProd;
  }

  ofertaCaja(sales: Sale[]): Sale{
    let saleProd: Sale;
    sales.forEach((sale: Sale)=>{
      if(sale.cant > 5 && sale.show){
        saleProd = sale;
      }
    })
    return saleProd;
  }

}
