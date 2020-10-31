import { Component, OnInit, Input,  } from '@angular/core';
import { Product } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-card',
  templateUrl: './prod-card.component.html',
  styleUrls: ['prod-card.component.css'],
})
export class ProdCardComponent implements OnInit {
  carga = false;
  p: any;
  itemPerPage: number = 12;

  @Input() items: Product[];
  @Input() termino: string = null;
  @Input() recomend: boolean = false;

  constructor(
    private cartSvc: CartService,
    private shareService: ShareInfoService,
    private router: Router
  ) {
  }

  ngOnInit(): void {}

  pageChanged(event: number) {
    this.p = event;
    let top: number = 0;
    if (this.router.url.includes('home')) {
      top = 380;
    }
    window.scroll({
      top: top,
    });
  }

 
}
