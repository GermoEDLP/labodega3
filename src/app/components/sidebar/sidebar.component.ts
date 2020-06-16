import { Component, OnInit } from '@angular/core';
import { listaCat } from '../../temps/dataProd';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listaCat = listaCat;

  constructor() { }

  ngOnInit(): void {
  }

}
