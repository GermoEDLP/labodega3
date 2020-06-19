import { Component, OnInit } from '@angular/core';
import { provs, deptos } from '../../temps/data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  provincias: any[];
  ciudades = deptos;  
  

  loadingBtn = false;
  aceptBtn = false;
  errores = false;

  registerF: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) 
  {
    this.crearFormReg(); 
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
    if(this.registerF.controls['email'].errors && this.registerF.controls['email'].errors['emailExist'] == null){
      return false
      
    }else{
      return true
    } ;
  }

  get emailValid() {
    return (
      this.registerF.get('email').touched &&
      !this.registerF.controls['email'].errors
    );
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
            this.resentEmail();
            
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

  resentEmail(){
    this.userService.sentEmailVerification();
  }

}
