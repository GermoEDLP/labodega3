import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { provs } from '../../../temps/data';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User, Venta } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-shipp',
  templateUrl: './shipp.component.html',
  styleUrls: ['../info/info.component.css'],
})
export class ShippComponent implements OnInit {
  charge: boolean = false;
  shippForm: FormGroup;
  data: any;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private router: Router
  ) {
    this.arranque();
  }

  ngOnInit(): void {}

  arranque() {
    if (localStorage.getItem('buyOrder')) {
      this.data = JSON.parse(localStorage.getItem('buyOrder'));      
      if (this.checkExpirancy()){
        this.crearFormulario();
        this.cargarFormulario();       
      }
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  checkExpirancy(): boolean{
    let now = new Date().getTime();
      if (this.data.expire > now) {
        return true;
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
  }

  cargarFormulario() {
    this.userSvc.auth.user.subscribe((user) => {
      this.userSvc.getUserData(user.uid).subscribe((data: any) => {
        this.shippForm.controls['prov'].setValue(data.prov);
        this.shippForm.controls['city'].setValue(data.city);
        this.shippForm.controls['adress'].setValue(data.adress);
        this.user = data;
        this.charge = true;
      });
    });
  }

  crearFormulario() {
    this.shippForm = this.fb.group({
      prov: ['', [Validators.required]],
      city: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      dpto: [''],
      infoAdd: [''],
    });
  }

  retirar(){
    if(!this.checkExpirancy()){
      this.router.navigateByUrl('/home');
    }
    if (localStorage.getItem('buyOrder')) {
      localStorage.removeItem('buyOrder');
    }
    let now = new Date().getTime();
    now = now + (15*60*1000);

    this.user.phone = this.data.user.phone;
    this.user.dni = this.data.user.dni;
    this.user.email = this.data.user.email;
    this.user.name = this.data.user.name;
    
    let item = {
      user: this.data.user,
      shipp: false,
      userComplete: this.user,
      expire: now
    };
    localStorage.setItem('buyOrder', JSON.stringify(item));
    this.router.navigateByUrl('/buy/pay');
  }

  checkear() {
    if(!this.checkExpirancy()){
      return;
    }
    if (localStorage.getItem('buyOrder')) {
      localStorage.removeItem('buyOrder');
    }
    let now = new Date().getTime();
    now = now + (15*60*1000);

    this.user.phone = this.data.user.phone;
    this.user.dni = this.data.user.dni;
    this.user.email = this.data.user.email;
    this.user.name = this.data.user.name;
    
    let item: Venta = {
      shipp: true,
      shippData: {
        prov: String(this.shippForm.controls['prov'].value),
        city: String(this.shippForm.controls['city'].value),
        adress: String(this.shippForm.controls['adress'].value),
        numero:Number( this.shippForm.controls['numero'].value),
        dpto: String(this.shippForm.controls['dpto'].value),
        infoAdd: String(this.shippForm.controls['infoAdd'].value)
      },
      userComplete: this.user,
      expire: now
    };
    localStorage.setItem('buyOrder', JSON.stringify(item));
    this.router.navigateByUrl('/buy/pay');
  }

  disabled() {
    Swal.fire({
      title: 'No se puede cambiar este dato',
      text:
        'Este valor no puede cambiarse, ya que es parte de la informacion de tu perfil. Procede al modificarlo desde el mismo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ir a Mi perfil',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/home');
      }
    });
  }
}
