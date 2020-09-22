import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs/operators';
import { User } from '../../interfaces/interfaces';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { provs, deptos } from '../../temps/data';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private user$: Observable<any> = this.userSvc.auth.user;
  protected userComplete: User;
  public profileForm: FormGroup;
  public emailForm: FormGroup;
  public avatarP: string;
  public email: string;
  public provincias = provs;
  public ciudades = deptos;
  protected avatarModal = false;
  protected helperArray = [
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

  constructor(
    private userSvc: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.arranque();
  }

  arranque() {
    this.user$.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.userSvc
          .getUserData(data.uid)
          .pipe(take(1))
          .subscribe((data: User) => {
            if (data) {
              this.cargarForm(data);
              this.userComplete = data;
            } else {
              this.router.navigateByUrl('/home');
            }
          });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  cambiarEmail() {
    if (this.emailForm.valid) {
      $('#emailModal').modal('hide');
      this.userSvc
        .updateEmail(this.emailForm.controls['email'].value)
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
          });
          Toast.fire({
            icon: 'success',
            title: 'Email actualizado correctamente',
          });
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El mail ingresado no es valido'
      })
    }
  }

  cerrarModal(){
    $('#emailModal').modal('hide');
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
      email: [data.email, [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]]
    });
  }

  activarCiudad() {
    this.ciudades = this.ciudades
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
}
