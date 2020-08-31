import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Venta } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  ventas: Venta[];

  constructor(private vtasSvc: VentasService) { }

  ngOnInit(): void {
    this.arranque();
  } 

  arranque(){
    this.vtasSvc.getAll().subscribe((ventas: Venta[])=>{
      this.ventas = ventas;
      console.log(ventas);
      
    })
  }

}
