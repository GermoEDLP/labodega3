import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sesion: boolean;
  pass2: String;
  name: String;
  born: String;
  pass: String;
  email: String;

  constructor() { 
    this.sesion = false;
  }

  ngOnInit(): void {
  }

  search(){
    // TODO hacer el buscador
  }

  registro(){
    console.log(this.user);
    
  }

}
