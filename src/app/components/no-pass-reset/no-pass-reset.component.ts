import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-no-pass-reset',
  templateUrl: './no-pass-reset.component.html',
  styleUrls: ['./no-pass-reset.component.css']
})
export class NoPassResetComponent implements OnInit {
  userEmail = new FormControl('', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'));
  viewAlert: boolean = false;
  message: {message: string, alert: string};
  ok: boolean;

  @Input('display') display;
  @Output() close = new EventEmitter<string>();

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }

  resetPass(){
    if(this.userEmail.valid){
      this.message = null;
      this.userSvc.resetPassword(this.userEmail.value).then(()=>{
        this.message = {message:'Se ha enviado un mail con la informacion necesaria para recuperar la contraseña', alert: 'alert-success'};
        this.ok = true;
      }).catch((err)=>{
        this.message = {message:'No existe ninguna cuenta asociada a este mail', alert: 'alert-danger'};        
      });
    }else{
      this.message = {message:'Coloque un mail valido', alert: 'alert-danger'};
    }
    
  }
  

  cerrar(info: string){
    this.close.emit(info)
  }

}
