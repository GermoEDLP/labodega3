import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/interfaces';

@Pipe({
  name: 'cutProd'
})
export class CutProdPipe implements PipeTransform {

  transform(products: Product[], cut: number): Product[] {
    return products.splice(cut, products.length-cut);
  }

}
