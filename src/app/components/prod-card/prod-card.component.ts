import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['prod-card.component.css']
})
export class ProdCardComponent implements OnInit {

  url = "https://picsum.photos/100/100";
  carga = false;

  @Input() item: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
