import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], termino: string, ): Product[] | boolean{
    if(termino.length<3){      
      return false;
    }else{
      termino = termino.toLocaleLowerCase();
      return value.filter((prod: Product)=>{
        return prod.name.toLocaleLowerCase().includes(termino) || prod.desc.toLocaleLowerCase().includes(termino);
      })
    }
  }

}