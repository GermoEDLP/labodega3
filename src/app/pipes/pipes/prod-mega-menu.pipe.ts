import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/interfaces';

@Pipe({
  name: 'prodMegaMenu'
})
export class ProdMegaMenuPipe implements PipeTransform {

  transform(value: string, products: Product[]): Product[] {        
    return products.filter((prod: Product)=>prod.cat.includes(value)).sort((a,b)=>a.date-b.date);
  }

}
