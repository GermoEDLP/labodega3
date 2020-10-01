import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Category } from '../../interfaces/interfaces';

declare var $: any;

@Component({
  selector: 'app-menu-cat-new-prod',
  templateUrl: './menu-cat-new-prod.component.html',
  styleUrls: ['./menu-cat-new-prod.component.css'],
})
export class MenuCatNewProdComponent implements OnInit, OnChanges {
  catsProdNew: Category[];

  @Input('catList') cats: Category[];
  @Input('view') view: boolean = false;

  @Output() close: EventEmitter<{
    id: string;
    name?: string;
  }> = new EventEmitter<{
    id: string;
    name?: string;
  }>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.view) {
      this.start();
    }
  }

  start() {
    $('#modalCats').modal('show');
  }

  cerrarSinMas(){
    $('#modalCats').modal('hide');
  }

  cerrar(name: string, id: string, i?: number) {
    $('#modalCats').modal('hide');
    console.log(name, id, i);
    
    if(i!=undefined){
      this.close.emit({
        name: name,
        id: id+'subs'+i
      })
    }else{
      this.close.emit({
        name: name,
        id: id
      })
    }
  }
}
