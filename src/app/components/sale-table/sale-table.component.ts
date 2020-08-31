import { Component, OnInit, Input } from '@angular/core';
import { Venta } from '../../interfaces/interfaces';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css']
})
export class SaleTableComponent implements OnInit {

  @Input('ventas') ventas: Venta[];
  @Input('empty') empty: string = 'No hay registros que mostrar';
  @Input('type') type: string;

  view: boolean = false;
  ventaModal: Venta;
  typeModal: string;

  constructor() { }

  

  ngOnInit(): void {
    
  }

  verVenta(venta: Venta){
    this.ventaModal = venta; 
    this.typeModal = venta.state;   
    this.view = true;    
  }

  cerrarModal(event){
    this.view = false;
    this.ventaModal = null;
  }

}
