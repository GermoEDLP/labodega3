import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2'
import { Product } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  productos = [];

  prods: Product = {
    name: '',
    description: '',
    stock:0,
    price:0,
    demand: false,
    image: null
  };


  constructor(private _prodService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerListaDeProductos();
  }

  createNewProduct() {
    console.log(this.prods);
    
    this._prodService.createProd(this.prods).subscribe(() => {
      this.obtenerListaDeProductos();
      Swal.fire({
        icon: 'success',
        title: 'Creado correctamente',
        text: 'Todo genial!',
        timer: 1500
      })
    });
  }

  obtenerListaDeProductos() {
    this._prodService.getProductos().subscribe((resp: any) => {
      this.productos = resp.coleccion;
    });
  }
}
