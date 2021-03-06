import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[], termino?: string, ): Product[] | boolean{
    if(termino == null){
      return value;
    }
    if(termino.length<2){      
      return false;
    }else{
      termino = termino.toLocaleLowerCase();
      let array = value.filter((prod: Product)=>{
        prod.name.toLocaleLowerCase().includes(termino) || prod.desc.toLocaleLowerCase().includes(termino);
      });
      return array;
    }
  }

}
