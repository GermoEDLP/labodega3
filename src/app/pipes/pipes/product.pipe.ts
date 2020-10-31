import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/interfaces';

@Pipe({
  name: 'product',
})
export class ProductPipe implements PipeTransform {
  transform(
    products: Product[],
    show: boolean = true,
    options: string = 'default',
    order?: string
  ): Product[] {
    switch (options) {
      case 'default':
        if (show) {
          return products.filter((prod: Product) => prod.show);
        } else {
          return products;
        }
      case 'stock':
        let a = products.filter((prod: Product) => prod.stock <= 0);
        let b = a.sort((a, b) => a.stock - b.stock);
        return b;

      case 'order':
        switch (order) {
          case 'name':
            return products.sort((a, b) => a.name.localeCompare(b.name));
          case 'price':
            return products.sort((a, b) => a.price - b.price);
          case 'stock':
            return products.sort((a, b) => a.stock - b.stock);
          case 'date':
            return products.sort((a, b) => a.date - b.date);
          case 'show':
            return products.sort((a, b) =>
              String(a.show).localeCompare(String(b.show))
            );
          default:
            return products.sort((a, b) => a.name.localeCompare(b.name));
        }

      default:
        break;
    }
  }
}
