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

  lista: Product[] = listaProductos;

  constructor(private _prodService: ProductosService) { }

  ngOnInit(): void {
    //TODO getOfertas en el servicio de productos
    // this._prodService.getOfertas().subscribe((lista: Product[]) => {
    //   this.lista = lista;
    // })
  }

}
