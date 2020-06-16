import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2'
import { Product } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {


  constructor(private _prodService: ProductosService, private route: ActivatedRoute) {}

  cod: string;

  ngOnInit(): void {
    // this.obtenerListaDeProductos();

    this.cod = this.route.snapshot.paramMap.get('cod');
    console.log(this.cod);
    
  }

  // createNewProduct() {
  //   console.log(this.prods);
    
  //   this._prodService.createProd(this.prods).subscribe(() => {
  //     this.obtenerListaDeProductos();
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Creado correctamente',
  //       text: 'Todo genial!',
  //       timer: 1500
  //     })
  //   });
  // }

  // obtenerListaDeProductos() {
  //   this._prodService.getProductos().subscribe((resp: any) => {
  //     this.productos = resp.coleccion;
  //   });
  // }
}
