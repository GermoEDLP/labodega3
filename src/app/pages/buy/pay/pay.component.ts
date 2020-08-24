import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['../info/info.component.css']
})
export class PayComponent implements OnInit {

  data: any;
  charge: boolean = false;

  constructor(private router: Router) {
    this.arranque();
  }

  ngOnInit(): void {
  }

  arranque() {
    if (localStorage.getItem('buyOrder')) {
      this.data = JSON.parse(localStorage.getItem('buyOrder'));
      let now = new Date().getTime();
      if (this.data.expire > now) {
        this.charge = true;
      } else {
        localStorage.removeItem('buyOrder');
        Swal.fire(
          'Orden Vencida',
          'Paso demasiado tiempo desde que empezaste la compra, por favor vuelve a iniciarla',
          'error'
        ).then(() => {
          this.router.navigateByUrl('/cart');
        });
      }
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  selectPayMethod(id: string){
    if (localStorage.getItem('buyOrder')) {
      localStorage.removeItem('buyOrder');
    }
    let now = new Date().getTime();
    now = now + (15*60*1000);
    
    this.data.expire = now;
    this.data.payMethod = id;
    localStorage.setItem('buyOrder', JSON.stringify(this.data));
    this.router.navigateByUrl('/buy/confirm');
  }

}
