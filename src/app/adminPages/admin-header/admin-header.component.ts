import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { menuAdmin } from '../../temps/data';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  user$: Observable<any> = this.userService.auth.user;
  userComplete: User;
  menu = menuAdmin;

  constructor(private userService: UserService, private router: Router) {
    this.arranque();
  }

  ngOnInit(): void {
  }

  arranque(){
    this.user$.subscribe((data)=>{
      if(data){
        this.userService.getUserData(data.uid).subscribe((data: User)=>{
          this.userComplete = data;       
        });      
      }else{
        this.router.navigateByUrl('/home')
      }
    }); 
  }

  cerrarSesion(){
    this.userService.logout();
    this.router.navigateByUrl('/home');
  }

}
