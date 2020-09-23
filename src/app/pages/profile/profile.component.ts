import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { take, takeUntil } from 'rxjs/operators';
import { User, Venta, TotalCart } from '../../interfaces/interfaces';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { provs, deptos } from '../../temps/data';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private user$: Observable<any> = this.userSvc.auth.user;
  public userComplete: User;
  public profileForm: FormGroup;
  public emailForm: FormGroup;
  public productoModal: TotalCart;
  public avatarP: string;
  public email: string;
  public provincias = provs;
  public ciudades = deptos;
  public ciudadByProv;
  public helperArray = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  public historical: Venta[] = [];
  private stop$: Subject<void> = new Subject<void>();

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.arranque();
  }

  arranque() {
    this.user$.pipe(takeUntil(this.stop$)).subscribe((data) => {
      if (data) {
        this.userSvc
          .getUserData(data.uid)
          .pipe(takeUntil(this.stop$))
          .subscribe((data: User) => {
            if (data) {
              this.cargarForm(data);
              this.userComplete = data;
            } else {
              this.router.navigateByUrl('/home');
            }
          });
        this.userSvc
          .getHistorical(data.uid)
          .pipe(takeUntil(this.stop$))
          .subscribe((data: Venta[]) => {
            this.historical = data.sort(function (a, b) {
              return b.date - a.date;
            });
            console.log(data);
          });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  async popUpProducts(index: number) {
    this.productoModal = await this.historical[index].products;
    $('#productModal').modal('show');
  }

  closeProdModal() {
    $('#productModal').modal('hide');
    this.productoModal = null;
  }

  toggleModal(abrir: string | boolean, cerrar: string | boolean, backdrop?: string | boolean) {
    if(abrir){
      $(abrir).modal({
        backdrop: backdrop,
        show: true,
      });
    }
    if(cerrar){
      $(cerrar).modal('hide');
    }
  }

  cambiarEmail() {
    if (this.emailForm.valid) {
      this.toggleModal('#updateModal', '#emailModal', true);
      this.userSvc
        .updateEmail(this.emailForm.controls['email'].value)
        .then(() => {
          this.toastMix('Email actualizado correctamente');
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El mail ingresado no es valido',
      });
    }
  }

  cambiarPass(){
    Swal.fire({
      title: 'Cambiar contraseña',
      text: "Para poder cambiar tu contraseña, se te enviará un link a tu correo declarado mediante la cual, podrás realizar la actualización. Mientras no accedas al link y coloques una nueva contraseña, sequirá siendo correcta la actual contraseña",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar Link'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userSvc.resetPassword(this.userComplete.email).then(()=>{
          this.toggleModal(false, '#updateModal')
          this.toastMix('Link enviado correctamente. Chequea tu casilla de correo');
        }).catch((err)=>{
        console.log('Error: ', err);
        });
      }
    })
  }

  toastMix(text: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
    });
    Toast.fire({
      icon: 'success',
      title: text,
    });
  }

  cargarForm(data: User) {
    this.profileForm = this.fb.group({
      name: [data.name, Validators.required],
      adress: [data.adress, Validators.required],
      prov: [data.prov, Validators.required],
      city: [data.city, Validators.required],
      born: [data.born, Validators.required],
    });
    this.activarCiudad();
    this.avatarP = data.avatar;
    this.emailForm = this.fb.group({
      email: [
        data.email,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  activarCiudad() {
    this.ciudadByProv = this.ciudades
      .filter(
        (ciudad) =>
          ciudad.provincia.nombre == this.profileForm.get('prov').value
      )
      .sort((a, b) => {
        if (a.nombre > b.nombre) {
          //comparación lexicogŕafica
          return 1;
        } else if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
  }

  updateDatos() {
    if (this.profileForm.valid) {
      this.userSvc
        .updateData({
          uid: this.userComplete.uid,
          name: this.profileForm.controls['name'].value,
          born: this.profileForm.controls['born'].value,
          email: this.userComplete.email,
          role: this.userComplete.role,
          prov: this.profileForm.controls['prov'].value,
          city: this.profileForm.controls['city'].value,
          adress: this.profileForm.controls['adress'].value,
          avatar: this.avatarP,
          created_at: this.userComplete.created_at,
        })
        .then(() => {
          $('#updateModal').modal('hide');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          });
          Toast.fire({
            icon: 'success',
            title: 'Datos actualizados correctamente',
          });
        });
    } else {
      Swal.fire(
        'Error',
        'Verifique que todos los campos sean correctos y esten completos',
        'error'
      );
    }
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}
