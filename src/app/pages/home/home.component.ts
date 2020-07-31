import { Component, OnInit } from '@angular/core';
import { listaProductos } from '../../temps/dataProd'
import { Product } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lista: Product[] = [];

  constructor(private _prodService: ProductosService) { }

  ngOnInit(): void {
    this._prodService.getProducts().subscribe((lista: Product[]) => {
      this.lista = lista;
    })
  }

}
