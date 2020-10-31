import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Product, cartProduct, Sale } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import { Router } from '@angular/router';
import Swiper from 'swiper';

import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';

@Component({
  selector: 'app-prod-card-inline',
  templateUrl: './prod-card-inline.component.html',
  styleUrls: ['prod-card-inline.component.css'],
})
export class ProdCardInlineComponent implements OnInit, AfterViewInit {
  carga = false;
  p: any;
  slidesPerView: number | 'auto' = 'auto';

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 'auto',
    navigation: true,
    pagination: false,
  };

  @Input() items: Product[];
  @Input() termino: string = 'name';
  @Input() recomend: boolean = false;
  @Input() cant: number = 10;

  constructor(
    private cartSvc: CartService,
    private shareService: ShareInfoService,
    private router: Router
  ) {
    this.calcularSlides();
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

  calcularSlides() {
    let x = window.innerWidth;
    if (x < 400) {
      this.config.slidesPerView = 1.2;
    } else if (x < 700) {
      this.config.slidesPerView = 2.2;
    } else {
      this.config.slidesPerView = 3.5;
    }
  }

  ngAfterViewInit() {
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1.2,
      spaceBetween: 10,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4.2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5.2,
          spaceBetween: 50,
        },
      },
    });
  }
}
