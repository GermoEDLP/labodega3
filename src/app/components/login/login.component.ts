import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginF: FormGroup;
  emailSave: string;
  error: boolean = false;

  @Input('display') display: boolean;
  @Output() close = new EventEmitter<string>(); 

  user$: Observable<any> = this.userService.auth.user;

  constructor(private fb: FormBuilder, public userService: UserService) {
    this.emailSave = localStorage.getItem('email') || '';
    this.createFormLogin();    
  }

  createFormLogin() {
    this.loginF = this.fb.group({
      email: [
        this.emailSave,
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      record: [''],
    }); 
  }

  login() {
    if (this.loginF.valid){
      this.error = false;
      this.userService.loginWithEmailAndPass(
        this.loginF.get('email').value,
        this.loginF.get('pass').value
      )
      .then(resp => {
        if(this.loginF.get('record').value){
          localStorage.setItem('email', this.loginF.get('email').value)
        }
        this.cerrar('cerrarLogin');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Sesión iniciada correctamente'
        })
      })
      .catch(err => {
        this.error = true;        
      })}else{
        this.error = true;
      }
  }


  current(){
    // this.userService.currentUser()
    // .then(resp=>{
    //   console.log(resp);
    //   this.userService.currentUser().then(resp => console.log(resp)
    //   );
    // }).catch(err=>
    //   {console.log(err)}
    //   )
  }

  

  cerrar(info: string){
    this.close.emit(info);
  }
}
