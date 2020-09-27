import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { take, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/interfaces';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recomend',
  templateUrl: './recomend.component.html',
  styleUrls: ['./recomend.component.css'],
})
export class RecomendComponent implements OnInit, OnDestroy {
  productos: Product[];
  subs: Subject<void> = new Subject<void>();

  constructor(private prodSvc: ProductosService) {}

  ngOnInit(): void {
    this.arranque();
  }

  arranque() {
    this.prodSvc
      .getProductsForRecomend()
      .pipe(takeUntil(this.subs))
      .subscribe((prods: Product[]) => {
        this.productos = prods;
        console.log(prods);
      });
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }
}
