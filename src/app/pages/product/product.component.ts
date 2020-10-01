import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product, cartProduct, Comment, Category, Sale } from '../../interfaces/interfaces';
import { ProductosService } from '../../services/productos.service';
import { CartService } from '../../services/cart.service';
import { ShareInfoService } from '../../services/share-info.service';
import Swal from 'sweetalert2';
import { CommentsService } from '../../services/comments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  cod: string;
  product: Product;
  comments: Comment[];
  view = false;
  commentForm: FormGroup;
  user$: Observable<any> = this.userSvc.auth.user;
  userSub: Subscription;
  commentSub: Subscription;
  prodSub: Subscription;
  cats: Category[];

  private stop$: Subject<boolean> = new Subject();

  list: number[] = [1, 2, 3, 4, 5, 6, 10, 12, 15];
  stars: number[] = [1, 2, 3, 4, 5];
  rate: number;

  @ViewChild('cant') cant: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private prodScv: ProductosService,
    private router: Router,
    private cartSvc: CartService,
    private catsSvc: CatsService,
    private shareService: ShareInfoService,
    private commSvc: CommentsService,
    private fb: FormBuilder,
    private userSvc: UserService
  ) {
    this.router.events.pipe(takeUntil(this.stop$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.arranque();
      }
    });
  }

  ngOnInit(): void {}

  arranque() {
    this.cod = this.route.snapshot.paramMap.get('cod');
    this.createCommentForm();
    this.catsSvc.getCats().pipe(take(1)).subscribe((data: Category[])=>{
      this.cats = data;
    })
    this.prodScv.getProductById(this.cod).pipe(takeUntil(this.stop$)).subscribe((prod: Product) => {
      if (prod) {
        this.product = prod;
        this.commSvc
          .getCommentByProduct(prod.id)
          .pipe(takeUntil(this.stop$))
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

  ofertaProducto(sales: Sale[]): Sale{
    let saleProd: Sale;
    sales.forEach((sale: Sale)=>{
      if(sale.cant < 5 && sale.show){
        saleProd = sale;
      }
    })
    return saleProd;
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
      rates: ['', Validators.required],
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
            this.shareService.emitChange('cargar');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 1500,
            });

            Toast.fire({
              icon: 'success',
              title:
                this.product.name +
                ' - ' +
                this.product.desc +
                ' agregado correctamente',
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
            this.shareService.emitChange('cargar');
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
            });

            Toast.fire({
              icon: 'success',
              title:
                this.product.name +
                ' - ' +
                this.product.desc +
                ' agregado correctamente',
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
    if (this.commentForm.valid) {
      this.user$.pipe(take(1)).subscribe((data) => {
        if (data) {
          this.commSvc
            .createComment({
              content: this.commentForm.controls['content'].value,
              user: {
                name: String(data.displayName),
                id: String(data.uid),
              },
              product: {
                name: String(this.product.name) + ' - ' + this.product.desc,
                id: String(this.product.id),
              },
              rate: Number(this.commentForm.controls['rates'].value),
              show: false,
            })
            .then(() => {
              this.commentForm.reset();
              Swal.fire(
                'Comentario enviado',
                'Tu comentario será revisado por nuestros moderadores antes de publicarse. Muchas gracias',
                'info'
              );
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes tener iniciada una sesión para poder comentar',
            showCancelButton: true,
            confirmButtonText: 'Menu de Login',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {
              this.shareService.emitChange('login');
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes completar la caja de comentarios y la puntuación.',
      });
    }
  }

  calcularRate(comms: Comment[]) {
    let counter = 0;
    let total = 0;
    comms.forEach((comm: Comment) => {
      if (comm.show) {
        counter++;
        total = total + comm.rate;
      }
    });
    if (total == 0) {
      return 0;
    } else {
      console.log(Math.round(total / counter));

      return Math.round(total / counter);
    }
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();    
  }

  onClick(event: Event) {
    window.scrollBy(0, 260);
  }
}
