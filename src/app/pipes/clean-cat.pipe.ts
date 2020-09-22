import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanCat'
})
export class CleanCatPipe implements PipeTransform {

  transform(value: string[]): string[] {
    return value.filter((sub: string)=>!sub.includes('SubcategoriaDesabilitadaPorAdmin'));
   
  }

}
