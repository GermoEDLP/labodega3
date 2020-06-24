import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Product } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css'],
})
export class ProdListComponent implements OnInit {
  productos: Product[]; //TODO crear interface de producto correctamente
  charge = false;

  constructor(private prodService: ProductosService) {}

  ngOnInit(): void {
    this.prodService.getProducts().subscribe((prods:Product[]) => {
      this.productos = prods;
      this.charge = true;
    });
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
            position: 'top-end',
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
