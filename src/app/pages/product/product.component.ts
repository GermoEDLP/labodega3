import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  cod: string;

  constructor(private route: ActivatedRoute) { 
    this.cod = this.route.snapshot.paramMap.get('cod');
    console.log(this.cod);
    
  }

  ngOnInit(): void {
  }

}
