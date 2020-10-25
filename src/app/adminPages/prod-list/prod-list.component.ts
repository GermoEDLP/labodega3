import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Product, Category } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css'],
})
export class ProdListComponent implements OnInit {
  productos: Product[]; //TODO crear interface de producto correctamente
  charge = false;
  categorias: Category[];
  searchList: string = 'name';
  search: string;

  constructor(private prodService: ProductosService, private cats: CatsService) {}

  async ngOnInit() {
    this.cats.getCats().subscribe(async(cats: Category[]) => {
      this.categorias = await cats;
    })
    this.prodService.getProducts().subscribe((prods:Product[]) => {
      this.productos = prods;
      this.charge = true;
    });
  }

  cambiarEstado(id: string, show: boolean){
    let title: string;
    let text: string;
    if(show){
      title = '¿Estas seguro de desabilitar este producto?'
      text = 'Si desabilita este producto, nadie podra verlo, ni ponerlo en su carrito, ni aparecerá en las busquedas'
    }else{
      title = '¿Estas seguro de habilitar este producto?';
      text = 'Si habilita este producto, todos podran verlo, ponerlo en su carrito y aparecerá en las busquedas'
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.prodService.cambiarEstadoVisual(id, show).then(()=>{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })

          Toast.fire({
            title: 'Actualizado!',
            text: 'El producto ha sido correctamente actualizado de la base de datos.',
            icon: 'success'
          })
        })
      }
    })
  }

  async variarStock(prod: Product){
    const { value: stock } = await Swal.fire({
      title: 'Cambiar valor de Stock',
      input: 'number',
      inputValue: String(prod.stock),
      inputPlaceholder: 'Ingrese el valor total de Stock',
      allowOutsideClick: false
    })
    
    if (stock !== prod.stock && Number(stock) !== NaN) {
      this.prodService.variarStock(prod.id, Number(stock)-prod.stock, true);
    }
  }

  borrarProducto(prod: Product){
    Swal.fire({
      title: '¿Estas seguro de borrar este producto?',
      text: prod.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.prodService.borrarProductoPorId(prod.id).then(()=>{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })

          Toast.fire({
            title: 'Borrado!',
            text: 'El producto ha sido correctamente borrado de la base de datos.',
            icon: 'success'
          })
        })
      }
    })
  }
}
