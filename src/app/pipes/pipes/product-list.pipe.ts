import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productList'
})
export class ProductListPipe implements PipeTransform {

  transform(value: boolean, options?: string): string {
    if(value){
      return 'Activo'
    }else{
      return 'Inactivo'
    }
  }

}
