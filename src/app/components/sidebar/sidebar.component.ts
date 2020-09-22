import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  disabled: string = "SubcategoriaDesabilitadaPorAdmin";

  constructor(public catsSvc: CatsService) { 
    
  }

  ngOnInit(): void {
    
  }

}
