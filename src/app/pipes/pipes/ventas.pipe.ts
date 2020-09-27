import { Pipe, PipeTransform } from '@angular/core';
import { Venta } from '../../interfaces/interfaces';

@Pipe({
  name: 'ventasPorState',
})
export class VentasPipe implements PipeTransform {
  transform(value: Venta[], state: string, shipp?: string): Venta[] {
    if (shipp) {
      if (shipp == 'shipp') {
        return value.filter(
          (venta: Venta) => venta.state == state && venta.shipp
        );
      } else {
        return value.filter(
          (venta: Venta) => venta.state == state && !venta.shipp
        );
      }
    } else {
      return value.filter((venta: Venta) => venta.state == state);
    }
  }
}
