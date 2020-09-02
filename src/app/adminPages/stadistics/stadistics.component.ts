import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Venta, Product } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css'],
})
export class StadisticsComponent implements OnInit {
  productos: Product[];

  constructor(private prodSvc: ProductosService, private router: Router) {}

  ngOnInit(): void {
    this.ultimos();
  }

  ultimos() {
    this.prodSvc.ultimosProds().subscribe((data: Product[]) => {
      if (data.length <= 5) {
        this.productos = data;
      } else {
        this.productos = data.splice(0, 5);
      }
    });
  }

  redirect(prod: Product) {
    this.router.navigateByUrl(`/product/${prod.id}`);
  }
}
