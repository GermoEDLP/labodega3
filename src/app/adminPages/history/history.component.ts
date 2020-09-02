import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { Venta } from 'src/app/interfaces/interfaces';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  ventas: Venta[];

  constructor(
    private vtaSvc: VentasService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.arranque();
  }

  arranque() {
    this.vtaSvc.getAll().subscribe((data: Venta[]) => {
      this.ventas = data;
    });
  }



}
