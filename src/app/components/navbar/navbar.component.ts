import { Component, OnInit } from '@angular/core';
import { listaCat } from '../../temps/dataProd';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  listaCat = listaCat;
  
  constructor() { }

  ngOnInit(): void {
  }

}
