import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  menu = [
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
          name: 'Recientes',
          url: ['list']
        },
        {
          name: 'Configuración',
          url: ['']
        }
      ]
    },
    {
      name: "Configuración",
      id: '004',
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
  //TODO traer el menu de manera dinamica

  constructor() { }

  ngOnInit(): void {
  }

}
