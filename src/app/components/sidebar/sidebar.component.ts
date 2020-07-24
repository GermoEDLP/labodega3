import { Component, OnInit } from '@angular/core';
import { listaCat } from '../../temps/dataProd';
import { Category } from '../../interfaces/interfaces';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  constructor(public catsSvc: CatsService) { 
    
  }

  ngOnInit(): void {
    
  }

}
