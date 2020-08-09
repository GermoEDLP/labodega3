import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../interfaces/interfaces';

@Pipe({
  name: 'cats',
})
export class CatListaProdPipe implements PipeTransform {
  transform(value: string[], arg: Category[]) {
    let respuesta: any[] = [];
    value.forEach((cat: string) => {
      if (cat.includes('subs')) {
        let parts = cat.split('subs');
        let name = arg.find((categorie) => categorie.id == parts[0]).subs[parts[1]];
        if(name && name !== "SubcategoriaDesabilitadaPorAdmin"){
          respuesta.push(name);
        }
      } else {
        let name = arg.find((categorie) => categorie.id == cat).name;
        if(name){
          respuesta.push(name);
        }
      }
    });
    return respuesta;
  }
}
