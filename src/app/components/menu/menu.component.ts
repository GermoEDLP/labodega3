import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { environment } from '../../../environments/environment.prod';
import { ProductosService } from '../../services/productos.service';
import { min, take } from 'rxjs/operators';
import { Product, Category, cartProduct, Sale } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  disabled: string = 'SubcategoriaDesabilitadaPorAdmin';
  productos: Product[];
  precios = environment.price;
  prodsMegaMenu: { cat: string; prod: Product }[] = [];

  constructor(public catsSvc: CatsService, private prodSvc: ProductosService, private cartSvc: CartService, private shareSvc: ShareInfoService) {
    this.arranque();
  }

  ngOnInit() {}

  arranque() {
    this.prodSvc
      .getProducts()
      .pipe(take(1))
      .subscribe((prods: Product[]) => {
        this.productos = prods;
      });
  }

  categoryForProduct(cat: string): any {
    if (this.prodsMegaMenu.find((ref) => ref.cat == cat)) {
      return this.prodsMegaMenu.find((ref) => ref.cat == cat);
    } else {
      return false;
    }
  }

  cerrarmMegaMenu(id: string) {
    const li = document.getElementById('li' + id);
    if (li.classList.contains('show')) {
      li.classList.remove('show');
    }
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
            this.shareSvc.emitChange('cargar');
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
            this.shareSvc.emitChange('cargar');
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

}
