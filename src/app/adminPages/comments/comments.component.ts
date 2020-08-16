import { Component, OnInit } from '@angular/core';
import { Comment, Product, User } from '../../interfaces/interfaces';
import { CommentsService } from '../../services/comments.service';
import { UserService } from '../../services/user.service';
import { ProductosService } from '../../services/productos.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[];

  constructor(
    private commSvc: CommentsService,
    private userSvc: UserService,
    private prodSvc: ProductosService
  ) {}

  ngOnInit(): void {
    this.commSvc.getComments().subscribe((comms: Comment[]) => {
      this.comments = comms;    
    });
  }

  get commentShowEmpty(){
    if(this.comments.filter((comm: Comment)=>!comm.show).length > 0){
      return true;
    }else{
      return false;
    }
  }

  borrar(id: string) {
    Swal.fire({
      title: 'Borrar Comentario',
      text: "Si usted borra este comentario, nunca podrá verse en la pagina del producto.",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.value) {
        this.commSvc.deleteComment(id).then(()=>{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Borrado correctamente'
          })
        })
      }
    })
  }

  visualizar(comm: Comment) {
    Swal.fire({
      title: 'Visualizar Comentario',
      text: "Si usted visualiza este comentario, todas las personas lo verán en la pagina del producto correspondiente y la puntuación que el usuario haya dejado en el producto afectará a la puntuación total del mismo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Visualizar'
    }).then((result) => {
      if (result.value) {
        this.commSvc.showComment(comm).then(()=>{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Actualizado correctamente'
          })
        })
      }
    })
  }
}
