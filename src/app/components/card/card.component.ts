import { Component, Input, OnInit } from '@angular/core';
import { Product, Sale, cartProduct } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('item') item: Product;

  constructor(private cartSvc: CartService, private shareService: ShareInfoService) { }

  ngOnInit(): void {
  }

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

}
