import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { Product, cartProduct, Comment } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import Swal from 'sweetalert2';
import { CommentsService } from '../../services/comments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  cod: string;
  product: Product;
  comments: Comment[];
  view = false;
  commentForm: FormGroup;
  user$: Observable<any> = this.userSvc.auth.user;
  userSub: any;

  list: number[] = [1, 2, 3, 4, 5, 6, 10, 12, 15];
  stars: number[] = [1,2,3,4,5];
  rate: number;

  @ViewChild('cant') cant: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private prodScv: ProductosService,
    private router: Router,
    private cartSvc: CartService,
    private shareService: ShareInfoService,
    private commSvc: CommentsService,
    private fb: FormBuilder,
    private userSvc: UserService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.arranque();
      }
    });
  }

  ngOnInit(): void {}

  arranque() {
    this.cod = this.route.snapshot.paramMap.get('cod');
    this.createCommentForm();
    this.prodScv.getProductById(this.cod).subscribe((prod: Product) => {
      if (prod) {
        this.product = prod;
        this.commSvc
          .getCommentByProduct(prod.id)
          .subscribe((comms: Comment[]) => {
            this.rate = this.calcularRate(comms);
            this.comments = comms.sort(function (a, b) {
              if (a.date < b.date) {
                return 1;
              }
              if (a.date > b.date) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
          });
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  agregar(cantidad?: number) {
    let element: any;
    let cant: number;
    if (!cantidad) {
      cant = Number((<HTMLInputElement>document.getElementById('cant')).value);
    } else {
      cant = cantidad;
    }
    this.cartSvc
      .searchSame(this.product.id)
      .then((elemento) => {
        element = elemento;
      })
      .then(() => {
        if (element) {
          this.cartSvc.addOne(element.id, cant).then(() => {
            this.shareService.emitChange('Hola mundo');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
            });

            Toast.fire({
              icon: 'success',
              title: this.product.name + ' agregado correctamente',
            });
          });
        } else {
          let itemCart: cartProduct = {
            name: this.product.name,
            cant: cant,
            price: this.product.price,
            sale: this.product.sale,
            desc: this.product.desc,
            img: this.product.image,
            idF: this.product.id,
          };
          this.cartSvc.saveProduct(itemCart).then(() => {
            this.shareService.emitChange('Hola mundo');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });

            Toast.fire({
              icon: 'success',
              title: this.product.name + ' agregado correctamente',
            });
          });
        }
      });
    //
  }

  change() {
    this.view = true;
  }

  checkear() {
    if (this.commentForm.controls['content'].valid) {
      this.userSub = this.user$.subscribe((data) => {
        if (data) {
          this.commSvc.createComment({
            content: this.commentForm.controls['content'].value,
            user: {
              name: String(data.displayName),
              id: String(data.uid)
            },
            product: {
              name: String(this.product.name),
              id: String(this.product.id)
            },
            rate: 3,
            show: false
          })
        } else {
          this.userSub.unsubscribe();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes tener iniciada una sesión para poder comentar',
            showCancelButton: true,
            confirmButtonText: 'Menu de Login',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {
              console.log('Desplegar menu de Login');
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes colocar algo en la caja de comentarios',
      });
    }
  }

  calcularRate(comms: Comment[]){
    let counter = 0;
    let total = 0;
    comms.forEach((comm: Comment)=>{
      if(comm.show){
        counter++;
        total = total + comm.rate;
      }
    });
    if(total==0){
      return 0;
    }else{
      console.log(Math.round(total/counter));
      
      return Math.round(total/counter);
    }
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
