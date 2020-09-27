import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../interfaces/interfaces';


@Pipe({
  name: 'cats',
})
export class CatListaProdPipe implements PipeTransform {
  transform(value: string[], arg: Category[], retorno?: string): any {
    if (retorno == 'subs') {
      let valor = value[0].slice(0, 20);
      let pre = arg.find((cat) => cat.id == valor);
      let preObj = [];
      pre.subs.forEach((element, i) => {
        preObj.push({
          name: element,
          link: pre.id+'subs'+i
        })  
      });
      preObj = preObj.filter((sub)=>sub.name!=='SubcategoriaDesabilitadaPorAdmin');
      return preObj;
    } else if(retorno == 'lista'){
      let respuesta: {link: string, name: string}[] = [];
      value.forEach((cat: string)=>{
        if(cat.includes('subs')){
          let a = cat.split('subs');
          let b = arg.find(ref => ref.id == a[0]);
          if(b.subs[a[1]]!=='SubcategoriaDesabilitadaPorAdmin'){
            respuesta.push({name: b.subs[a[1]], link: `/search/categorie${a[0]}subs${a[1]}`})
          }
        }else{
          let a = cat.slice(0,20);
          let b = arg.find(ref => ref.id == a);
          respuesta.push({name: b.name, link: `/search/categorie${a}`})
        }
      });
      return respuesta;
    }else {
      let respuesta: any;
      if (value[0].includes('subs')) {
        let parts = value[0].split('subs');
        if (retorno == 'nombreCat') {
          function probar(cat) {
            return cat.id == parts[0];
          }
          let pre = arg.find(probar);
          respuesta = pre.name;
        } else {
          function test(cat) {
            return cat.id == parts[0];
          }
          let pre = arg.find(test);
          respuesta = pre.subs[parts[1]];
        }
      } else {
        function test(cat){
          return  cat.id == value[0];
        }
        let pre = arg.find(test);
        respuesta = pre.name;
      }
      return respuesta;
    }
  }
}
