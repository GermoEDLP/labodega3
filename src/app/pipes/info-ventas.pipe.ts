import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infoVentas',
})
export class InfoVentasPipe implements PipeTransform {
  transform(value: string | boolean, format: string): string {
    switch (format) {
      case 'payMethod':
        switch (value) {
          case 'cash':
            return 'Efectivo';
          case 'bank':
            return 'Transferencia';
          case 'mp':
            return 'MercadoPago';
          default:
            return 'Desconocida';
        }
      case 'shipp':
        if (value) {
          return 'Envio';
        } else {
          return 'Retira en sucursal';
        }

      case 'state':
        switch (value) {
          case 'pend':
            return 'Pendiente';
          case 'transfer':
            return 'Esperando pago';
          case 'mpPay':
            return 'Esperando pago';
          case 'confirm':
            return 'Lista';
          case 'finalize':
            return 'Finalizada';

          default:
            break;
        }

      case 'stateProfile':
        switch (value) {
          case 'pend':
            return 'Siendo armado';
          case 'transfer':
            return 'Esperando transferencia ';
          case 'mpPay':
            return 'Esperando pago (MP)';
          case 'confirm':
            return 'Confirmada';
          case 'finalize':
            return 'Finalizada';

          default:
            break;
        }

      default:
        break;
    }
  }
}
