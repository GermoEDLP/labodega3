import { Component, OnInit, Input } from '@angular/core';
import { Product, cartProduct, Sale } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['prod-card.component.css'],
})
export class ProdCardComponent implements OnInit {
  carga = false;
  p: any;
  itemPerPage: number = 12

  @Input() items: Product[];
  @Input() termino: string = null;
  @Input() recomend: boolean = false;

  constructor(
    private cartSvc: CartService,
    private shareService: ShareInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public agregarACarrito(item: Product, cant?: number) {
    let element: any;
    if(!cant){
      cant=1;
    }
    this.cartSvc
      .searchSame(item.id)
      .then((elemento) => {
        element = elemento;
      })
      .then(() => {
        if (element) {
          this.cartSvc.addOne(element.id).then(()=>{
            this.shareService.emitChange('cargar');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
            });

            Toast.fire({
              icon: 'success',
              title: item.name + ' - '+ item.desc + ' agregado correctamente',
            });
          });
          
        } else {
          let itemCart: cartProduct = {
            name: item.name,
            cant: cant,
            price: item.price,
            img: item.image,
            sale: item.sale,
            desc: item.desc,
            idF: item.id,
          };
          this.cartSvc.saveProduct(itemCart).then(() => {
            this.shareService.emitChange('cargar');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
            });

            Toast.fire({
              icon: 'success',
              title: item.name + ' - '+ item.desc + ' agregado correctamente',
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

  pageChanged(event: number){
    this.p = event;
    let top: number = 0;
    if(this.router.url.includes('home')){
      top = 380

    }
    window.scroll({
      top: top
    })
  }

}
