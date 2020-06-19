import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/interfaces';
import { provs, deptos } from '../../temps/data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  provincias: any[];
  ciudades = deptos;

  loadingBtn = false;
  aceptBtn = false;
  errores = false;

  sesion: boolean;

  registerF: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.crearFormReg();
    this.sesion = false;
  }

  ngOnInit(): void {
    this.provincias = this.ordenarProvs();
  }

  ordenarProvs() {
    return provs.sort(function (o1, o2) {
      if (o1.nombre > o2.nombre) {
        //comparación lexicogŕafica
        return 1;
      } else if (o1.nombre < o2.nombre) {
        return -1;
      }
      return 0;
    });
  }

  campoInvalido(campo) {
    return (
      this.registerF.get(campo).invalid && this.registerF.get(campo).touched
    );
  }

  get provSelected() {
    return this.registerF.get('prov').touched;
  }

  get emailExist() {
    return this.registerF.controls['email'].errors;
  }

  get emailValid() {
    return (
      this.registerF.get('email').touched &&
      !this.registerF.controls['email'].errors
    );
  }

  repitePassInvalid() {
    let pass = this.registerF.get('pass');
    let pass2 = this.registerF.get('pass2');
    if (pass2.touched) {
      if (pass.value !== pass2.value) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  search() {
    // TODO hacer el buscador
  }

  activarCiudad() {
    this.ciudades = deptos;
    this.ciudades = this.ciudades
      .filter(
        (ciudad) => ciudad.provincia.nombre == this.registerF.get('prov').value
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

  

  crearFormReg() {
    this.registerF = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      born: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['', [Validators.required, Validators.minLength(8)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      prov: ['', Validators.required],
      city: ['', Validators.required],
      adress: ['', Validators.required],
    });
  }

  guardar() {
    this.errores = false;
    this.loadingBtn = true;
    if (this.registerF.invalid) {
      this.registerF.markAllAsTouched();
    } else {
      this.userService
        .createUserAuth(
          this.registerF.get('email').value,
          this.registerF.get('pass').value
        )
        .then((resp) => {
          this.userService.createUserDB({
            uid: resp.user.uid,
            name: this.registerF.get('name').value,
            born: this.registerF.get('born').value,
            email: resp.user.email,
            role: 'USER_ROLE',
            prov: this.registerF.get('prov').value,
            city: this.registerF.get('city').value,
            adress: this.registerF.get('adress').value,
          }).then(resp => {
            console.log('ok', resp);
            this.reenviarLinkVerificacion()
              .then(resp => {
                console.log('ok', resp);
                
              })
              .catch(err => {
                console.log('error', err);
                
              });
            
          }).catch(err => {
            console.log('error', err);
            this.errores = true;
          })

          console.log(resp);
          this.loadingBtn = false;
          this.aceptBtn = true;
        })
        .catch((err) => {
          console.log(err);

          if ((err.message = 'auth/email-already-in-use')) {
            this.registerF.controls['email'].setErrors({ emailExist: true });
          } else if ((err.message = 'auth/weak-password')) {
            this.registerF.controls['pass'].setErrors({ toShort: true });
          }
          this.loadingBtn = false;
          this.errores = true;

          console.log(this.registerF);
        });
    }
  }

  

  reenviarLinkVerificacion(){
   return  this.userService.sentEmailVerification(this.registerF.get('email').value);
              
  }


}
