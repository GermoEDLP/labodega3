import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { CatsService } from '../../services/cats.service';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  prodForm: FormGroup;

  code: string;
  producto: any;
  categoriasDelProd: string[] = [];
  charge = false;
  cats: any[];
  image: any;
  imageSaved: any;

  constructor(
    private route: ActivatedRoute,
    private navigate: Router,
    private fb: FormBuilder,
    private prodService: ProductosService,
    private catsService: CatsService
  ) {
    this.code = this.route.snapshot.paramMap.get('cod');
    catsService.getCats().subscribe((cats) => {
      this.cats = cats;      
    });
  }

  ngOnInit(): void {
    this.createProdLogin();
    if (this.code !== 'nuevo') {
      this.prodService.getProductById(this.code).subscribe((prod: any) => {
        this.producto = prod;
        this.categoriasDelProd = prod.cat;
        this.prodForm.controls['name'].setValue(prod.name);
        this.prodForm.controls['desc'].setValue(prod.desc);
        this.prodForm.controls['stock'].setValue(prod.stock);
        this.prodForm.controls['price-u'].setValue(prod.price[0]);
        this.prodForm.controls['price-box'].setValue(prod.price[1]);
        this.prodForm.controls['sale-u'].setValue(prod.sale[0]);
        this.prodForm.controls['sale-box'].setValue(prod.sale[1]);
        this.prodForm.controls['order'].setValue(prod.order);
        this.imageSaved = prod.image;
        this.charge = true;
      });
    } else {
      this.charge = true;
    }
  }

  get nuevo() {
    return this.code == 'nuevo';
  }

  createProdLogin() {
    this.prodForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      'price-u': ['', [Validators.required]],
      'price-box': ['', [Validators.required]],
      'sale-u': ['', [Validators.required]],
      'sale-box': ['', [Validators.required]],
      stock: [''],
      image: ['', [Validators.required]],
      order: ['', [Validators.required]],
    });
  }

  guardar() {

    

    let prodSave: Product = {
      name: this.prodForm.controls['name'].value,
      desc: this.prodForm.controls['desc'].value,
      stock: this.prodForm.controls['stock'].value,
      price: [
        this.prodForm.controls['price-u'].value,
        this.prodForm.controls['price-box'].value,
      ],
      sale: [
        this.prodForm.controls['sale-u'].value,
        this.prodForm.controls['sale-box'].value,
      ],
      order: this.prodForm.controls['order'].value,
      cat: this.categoriasDelProd,
      show: true,
    }

    if (this.code == 'nuevo') {
      let noFoto = false;
      //Nuevo
      Swal.fire({
        title: 'Espere...',
        text: 'Estamos creando su producto',
        showConfirmButton: false,
        icon: 'info',
      });
      if(this.image == undefined){
        this.image = 'https://firebasestorage.googleapis.com/v0/b/labodegabebidas.appspot.com/o/images%2Fproducto-sin-imagen.png?alt=media&token=9dd41300-5fd1-4a80-ae72-a07582db312b';
        noFoto = true;
      }
      this.prodService
        .creaProductoYSubeImagen(prodSave, this.image, noFoto)
        .then((resp) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Excelente',
            html: `Tu producto <b>${this.prodForm.controls['name'].value} fue creado exitosamente</b>`,
            timer: 2000,
          });
        })
        .then(() => {
          this.navigate.navigate(['/admin/list']);
        });
    } else {
      //Actualizar
      let noFoto = false;
      Swal.fire({
        title: 'Espere...',
        text: 'Estamos actualizando su producto',
        showConfirmButton: false,
        icon: 'info',
      });
      if(this.image == undefined){
        this.image = this.imageSaved;
        noFoto = true;
      }
      prodSave.id = this.producto.id;

      this.prodService.actualizaProductoYSubeImagen(prodSave, this.image, noFoto)
      .then((resp) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Excelente',
          html: `Tu producto <b>${this.prodForm.controls['name'].value} fue actualizado exitosamente</b>`,
          timer: 2000,
        });
      })
      .then(() => {
        this.navigate.navigate(['/admin/list']);
      });
    }
  }



  borrarCategoria(i: number) {
    this.categoriasDelProd.splice(i, 1);
  }
  agregarCategoria(name: string) {
    this.categoriasDelProd.push(name);
  }
  handleImage(event){
    this.image = event.target.files[0];
  }
}
