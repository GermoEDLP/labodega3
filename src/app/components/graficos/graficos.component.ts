import { Component, OnInit, Input } from '@angular/core';
import { VentasService } from '../../services/ventas.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Venta } from '../../interfaces/interfaces';
import { concat } from 'rxjs';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css'],
})
export class GraficosComponent implements OnInit {
  @Input('type') type;
  data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  mesesArmados = [];
  colores: Color[] = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  constructor(private vtaSvc: VentasService) {}

  ngOnInit(): void {
    switch (this.type) {
      case 'VxM':
        this.calcularVtasxMes();
        break;
      case 'IxM':
        this.calcularIngresoxMes();
      default:
        break;
    }
  }

  calcularVtasxMes() {
    this.vtaSvc.getAllFinal().subscribe((ventas: Venta[]) => {
      let now = new Date();
      ventas.forEach((venta) => {
        let fecha = venta.date.toDate();
        let mes = fecha.getMonth();
        let ano = fecha.getFullYear();
        if (
          (mes <= now.getMonth() && ano == now.getFullYear()) ||
          (mes > now.getMonth() && ano == now.getFullYear() - 1)
        ) {
          this.data[mes] = this.data[mes] + 1;
        }
      });
      this.meses.forEach((mes, i) => {
        if (i <= now.getMonth()) {
          this.mesesArmados[i] = mes + ' ' + now.getFullYear();
        } else {
          this.mesesArmados[i] = mes + ' ' + (now.getFullYear() - 1);
        }
      });
      this.lineChartLabels = this.recortarYRearmar(this.mesesArmados, now);
      this.lineChartData = [
        { data: this.recortarYRearmar(this.data, now), label: 'Ventas x mes' },
      ];
      this.lineChartColors[0] = this.colores[0];
    });
  }

  calcularIngresoxMes() {
    this.vtaSvc.getAllFinal().subscribe((ventas: Venta[]) => {
      let now = new Date();
      ventas.forEach((venta) => {
        let fecha = venta.date.toDate();
        let mes = fecha.getMonth();
        let ano = fecha.getFullYear();
        if (
          (mes <= now.getMonth() && ano == now.getFullYear()) ||
          (mes > now.getMonth() && ano == now.getFullYear() - 1)
        ) {
          this.data[mes] = this.data[mes] + venta.products.subtotal;
        }
      });
      this.meses.forEach((mes, i) => {
        if (i <= now.getMonth()) {
          this.mesesArmados[i] = mes + ' ' + now.getFullYear();
        } else {
          this.mesesArmados[i] = mes + ' ' + (now.getFullYear() - 1);
        }
      });
      this.lineChartLabels = this.recortarYRearmar(this.mesesArmados, now);
      this.lineChartData = [
        {
          data: this.recortarYRearmar(this.data, now),
          label: 'Ingreso neto x mes',
        },
      ];
      this.lineChartColors[1] = this.colores[1];
    });
  }

  recortarYRearmar(original: any[], now: Date) {
    let recorteLabels = original.splice(
      now.getMonth() + 1,
      11 - now.getMonth()
    );
    return recorteLabels.concat(original);
  }

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] = [];

  public lineChartColors: Color[] = [];

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{}],
    },
    annotation: {
      annotations: [{}],
    },
  };


}
