import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit, OnDestroy {

  menu: any[];
  //TODO traer el menu de manera dinamica

  constructor(private router: Router) {
    this.arranque();
  }

  ngOnInit(): void {
  }

  arranque(){
    this.menu = [
      {
        name: "Estadisticas",
        id: '001',
        subs: [
          {
            name: 'Generales',
            url: ['list']
          },
        ]
      },
      {
        name: "Productos",
        id: '002',
        subs: [
          {
            name: 'Lista',
            url: ['list']
          },
          {
            name: 'Nuevo Producto',
            url: ['newProd', 'nuevo']
          }
        ]
      },
      {
        name: "Ventas",
        id: '003',
        subs: [
          {
            name: 'Organizar',
            url: ['sales']
          },
          {
            name: 'Configuración',
            url: ['confSale']
          }
        ]
      },
      {
        name: "Comentarios",
        id: '004',
        subs: [
          {
            name: 'Moderar',
            url: ['comment']
          }
        ]
      },
      {
        name: "Configuración",
        id: '005',
        subs: [
          {
            name: 'Slider',
            url: ['slider']
          },
          {
            name: 'Categorias',
            url: ['categories']
          }
        ]
      }
    ]
  }

  ngOnDestroy(){
    this.menu = null;    
  }

}



