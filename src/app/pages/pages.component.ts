import { Component, OnInit } from '@angular/core';
import { ShareInfoService } from '../services/share-info.service';
import { CatsService } from '../services/cats.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private sideBar: CatsService) { 
    sideBar.cargarMenu();
  }

  ngOnInit(): void {
  }

}
