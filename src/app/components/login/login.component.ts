import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginF: FormGroup;
  emailSave: string;

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
    
      this.userService.loginWithEmailAndPass(
        this.loginF.get('email').value,
        this.loginF.get('pass').value
      )
      .then(resp => {
        if(this.loginF.get('record').value){
          localStorage.setItem('email', this.loginF.get('email').value)
        }
        //TODO setear indexDB y guaradar la info del usuario en la base de datos
        
      })
      .catch(err => {
        console.log(err);
        
      })}
  }


  current(){
    this.userService.currentUser()
    .then(resp=>{
      console.log(resp);
      this.userService.currentUser().then(resp => console.log(resp)
      );
    }).catch(err=>
      {console.log(err)}
      )
  }

  logout(){
    this.userService.logout()
  }
}
