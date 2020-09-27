import { Pipe, PipeTransform } from '@angular/core';
import { Category, FilterCat } from '../../interfaces/interfaces';

@Pipe({
  name: 'searchCat'
})
export class SearchCatPipe implements PipeTransform {

  transform(value: Category[], termino: string): FilterCat[] | boolean{
    if(termino.length<2){      
      return false;
    }else{
      termino = termino.toLocaleLowerCase();
      let filtrado: FilterCat[] = [];
      value.forEach((cat: Category)=>{
        if(cat.name.toLocaleLowerCase().includes(termino)){
          filtrado.push({
            cat: cat.name,
            id: 'categorie'+cat.id
          });
        }else{
          cat.subs.forEach((subcat, index)=>{
            if(subcat.toLocaleLowerCase().includes(termino)){
              filtrado.push({
                cat: subcat,
                id: 'categorie'+cat.id+'subs'+index
              })
            }
          })
        }
      });
      return filtrado;
    }




  }

}
