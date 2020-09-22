import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { environment } from '../../../environments/environment.prod';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  disabled: string = 'SubcategoriaDesabilitadaPorAdmin';
  precios = environment.price;

  constructor(public catsSvc: CatsService, private prodSvc: ProductosService) {}

  ngOnInit() {}

  

  cerrarmMegaMenu(id: string) {
    const li = document.getElementById('li'+id);    
    if (li.classList.contains('show')) {
      li.classList.remove('show');
    }
  }
}
