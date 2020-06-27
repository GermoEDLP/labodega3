import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../interfaces/interfaces';
import { CatsService } from '../../services/cats.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private catSvc: CatsService) {
    
  }

  ngOnInit(): void {
    if(!localStorage.getItem('categorias-modal-inicio')){

      Swal.fire({
        icon: 'info',
        title: 'Atención',
        text:
          'Para que los cambios realizados en esta pagina perduren, es necesario que al finalizar se guarden todos los cambios con el Boton "Guardar Todo" ubicado arriba a la derecha de la pantalla',
        input: 'checkbox',
        inputPlaceholder: 'No volver a mostrar este cartel',
        preConfirm: (result) => {
          if(result==1){
            localStorage.setItem('categorias-modal-inicio', 'ok');
          }        
        },
        });
    }

    this.catSvc.getCats().subscribe((cats: Category[]) => {
      this.categories = cats;
    });
  }

  editarSubCat(cat: number, sub: number) {
    Swal.fire({
      title: 'Editar sub-categoria',
      input: 'text',
      inputValue: this.categories[cat].subs[sub],
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Modificar',
      showLoaderOnConfirm: true,
      preConfirm: (updatedSub) => {
        this.categories[cat].subs[sub] = updatedSub;
      },
    });
  }

  borrarSubCat(cat: number, sub: number) {
    Swal.fire({
      title: 'Borrar categoria',
      html: `Esta seguro de borrar esta subcategoria: <b>${this.categories[cat].subs[sub]}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      this.categories[cat].subs.splice(sub, 1);
    });
  }

  nuevaSubCat(cat: number) {
    Swal.fire({
      title: 'Crear nueva Subcategoria',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (subCat) => {
        this.categories[cat].subs.push(subCat);
      },
    });
  }

  nuevaCategoria() {
    Swal.fire({
      title: 'Crear nueva Categoria',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (cat) => {
        this.categories.push({
          name: cat,
          id: 'provisorio' + cat,
          subs: [],
        });
      },
    });
  }

  saveAll(){
    this.catSvc.updateCategories(this.categories);
  }
}
