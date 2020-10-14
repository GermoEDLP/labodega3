import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { CatsService } from '../../services/cats.service';
import Swal from 'sweetalert2';
import { Product, Category, Sale } from '../../interfaces/interfaces';

// CK Editor
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { listaCompleta } from 'src/app/temps/lista';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  prodForm: FormGroup;

  @HostListener('keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent) {
    if (e.keyCode == 32) {
      e.stopPropagation();
    }
  }

  code: string;
  producto: Product;
  viewCatMenu: boolean = false;
  categoriasDelProd: {
    id: string;
    name?: string;
  }[] = [];
  charge = false;
  cats: Category[];
  image: any;
  imageSaved: any;
  imgPreview: any = null;
  disabled: string = 'SubcategoriaDesabilitadaPorAdmin';

  Editor = ClassicEditor;

  sales: Sale[] = [];

  constructor(
    private route: ActivatedRoute,
    private navigate: Router,
    private fb: FormBuilder,
    private prodService: ProductosService,
    private catsService: CatsService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.arranque();
      }
    });
  }

  ngOnInit() {}

  arranque() {
    this.sales = [];
    this.imgPreview = null;
    this.code = this.route.snapshot.paramMap.get('cod');
    this.catsService.getCats().subscribe((cats: Category[]) => {
      this.cats = cats;
    });
    this.createProdLogin();
    if (this.code !== 'nuevo') {
      this.cargarProducto();
    } else {
      this.charge = true;
    }
  }

  cargarProducto() {
    this.prodService
      .getProductById(this.code)
      .subscribe(async (prod: Product) => {
        this.sales = prod.sale;
        this.producto = prod;
        this.categoriasDelProd = await this.categoriasPorId(prod.cat);
        this.prodForm.controls['name'].setValue(prod.name);
        this.prodForm.controls['desc'].setValue(prod.desc);
        this.prodForm.controls['longDesc'].setValue(prod.longDesc);
        this.prodForm.controls['stock'].setValue(prod.stock);
        this.prodForm.controls['price'].setValue(prod.price);
        this.prodForm.controls['order'].setValue(prod.order);
        this.imageSaved = prod.image;
        this.charge = true;
      });
  }

  get nuevo() {
    return this.code == 'nuevo';
  }

  get precio() {
    return (
      this.prodForm.controls['price'].value &&
      this.prodForm.controls['price'].value > 0
    );
  }

  createProdLogin() {
    this.prodForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      longDesc: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: [''],
      image: ['', [Validators.required]],
      order: ['', [Validators.required]],
    });
  }

  categoriasPorId(ids: string[]): { id: string; name: string }[] {
    /* Función que se encarga de devolver un array con los nombres de las categorias en base
    a los id ingresados. Tener en cuenta que si posee la palabra 'subs' Es que pertenece a una
    subcategoria y despues de este termino se encuentra la posición de la misma en el array de 
    subcategorias.    */
    let categoriasOriginales = [];
    ids.forEach((id: string) => {
      if (id.includes('subs')) {
        let ides = id.split('subs');
        categoriasOriginales.push({
          id: id,
          name: this.cats.find((cat) => cat.id == ides[0]).subs[ides[1]],
        });
      } else {
        categoriasOriginales.push({
          id: id,
          name: this.cats.find((cat) => cat.id == id).name,
        });
      }
    });
    return categoriasOriginales;
  }

  checkear() {
    if (this.checkearPromos(this.sales)) {
      this.guardar();
    } else {
      Swal.fire(
        'Error?',
        'No puedes tener mas de 2 promociones activadas. Revisa tener una promo para caja y, a lo sumo, otra particular',
        'error'
      );
    }
  }

  checkearPromos(sales: Sale[]) {
    let cantidad = 0;
    sales.forEach((sale: Sale) => {
      if (sale.show) {
        cantidad++;
      }
    });
    if (cantidad > 2) {
      return false;
    } else {
      return true;
    }
  }

  async guardar() {
    let prodSave: Product = await {
      name: this.prodForm.controls['name'].value,
      desc: this.prodForm.controls['desc'].value,
      longDesc: this.prodForm.controls['longDesc'].value,
      stock: this.prodForm.controls['stock'].value,
      price: this.prodForm.controls['price'].value,
      sale: this.sales,
      order: this.prodForm.controls['order'].value,
      cat: this.condensarCategorias(this.categoriasDelProd),
      show: true,
    };

    if (this.code == 'nuevo') {
      let noFoto = false;
      //Nuevo
      Swal.fire({
        title: 'Espere...',
        text: 'Estamos creando su producto',
        showConfirmButton: false,
        icon: 'info',
      });
      if (this.image == undefined) {
        this.image =
          'https://firebasestorage.googleapis.com/v0/b/labodegabebidas.appspot.com/o/images%2Fproducto-sin-imagen.png?alt=media&token=9dd41300-5fd1-4a80-ae72-a07582db312b';
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
      if (this.image == undefined) {
        this.image = this.imageSaved;
        noFoto = true;
      }
      prodSave.id = this.producto.id;

      this.prodService
        .actualizaProductoYSubeImagen(prodSave, this.image, noFoto)
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

  borrarSubCategoria(i: number) {
    this.categoriasDelProd.splice(i, 1);
    console.log(this.categoriasDelProd);
  }

  agregarCategoria(name: string, id: string) {
    this.categoriasDelProd.push({ id: id, name: name });
    console.log(this.categoriasDelProd);
  }

  condensarCategorias(cats: { id: string; name?: string }[]) {
    let catsCond: string[] = [];
    cats.forEach((cat: any) => {
      catsCond.push(cat.id);
    });

    return catsCond;
  }

  handleImage(event) {
    this.image = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    // Show preview
    var mimeType = this.image.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = (_event) => {
      this.imgPreview = reader.result;
    };
  }

  async agregarPromo() {
    const { value: formValues } = await Swal.fire({
      title: 'Nueva Promoción',
      html: `<input type="text" name="nombre" id="nombre" class="swal2-input" placeholder="Nombre de la promo" maxlength="10" title="Este nombre debe ser corto e identificar correctamente la promoción. Ejemplo: 2x1, 3x2, 50% 2da u., etc">
        <input type="text" name="desc" id="desc" class="swal2-input" placeholder="Descripcion de la promo" maxlength="15" title="Aqui se describe la promoción. Tambien debe ser corto. Ejemplo: Para 2x1, se puede colocar 'Llevas 2, pagas 1'">
        <input type="number" name="cant" id="cant" class="swal2-input" placeholder="Cantidad minima de producto" style="max-width: none !important;" title="Aqui especificaremos la cantidad de productos que debe adquirir el usuario para que aplique la promo. Por ejemplo: Para un 3x2, son necesarias un minimo de 3 unidades.">
        <input type="number" name="off" id="off" class="swal2-input" placeholder="Precio final pro producto" style="max-width: none !important;" title="Aqui colocaremos el precio final del producto afectado por la promocion. Por ejemplo: En un 2x1, el precio seria la mitad (50% off)">
        <br>
        <label for="show">Mostrar</label>
        <input type="checkbox" name="show" id="show" class="swal2-input">`,
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('cant')).value,
          (<HTMLInputElement>document.getElementById('off')).value,
          (<HTMLInputElement>document.getElementById('show')).checked,
          (<HTMLInputElement>document.getElementById('desc')).value,
        ];
      },
    });
    let sale: Sale = {
      name: String(formValues[0]),
      show: formValues[3],
      off: Number(formValues[2]),
      cant: Number(formValues[1]),
      desc: String(formValues[4]),
    };
    this.sales.push(sale);
  }

  borrarPromo(pos: number, item: Sale) {
    Swal.fire({
      title: 'Esta seguro de borrar esta promoción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.sales.splice(pos, 1);
      }
    });
  }

  async updatePromo(pos: number, item: Sale) {
    const { value: formValues } = await Swal.fire({
      title: 'Nueva Promoción',
      html: //html 
      `<input value="${item.name}" type="text" name="nombre" id="nombre" class="swal2-input" placeholder="Nombre de la promo" maxlength="10" title="Este nombre debe ser corto e identificar correctamente la promoción. Ejemplo: 2x1, 3x2, 50% 2da u., etc">
      <input value="${item.desc}" type="text" name="desc" id="desc" class="swal2-input" placeholder="Descripcion de la promo" maxlength="15" title="Aqui se describe la promoción. Tambien debe ser corto. Ejemplo: Para 2x1, se puede colocar 'Llevas 2, pagas 1'">
      <input value="${item.cant}" type="number" name="cant" id="cant" class="swal2-input" placeholder="Cantidad minima de producto" style="max-width: none !important;" title="Aqui especificaremos la cantidad de productos que debe adquirir el usuario para que aplique la promo. Por ejemplo: Para un 3x2, son necesarias un minimo de 3 unidades.">
      <input value="${item.off}" type="number" name="off" id="off" class="swal2-input" placeholder="Precio final pro producto" style="max-width: none !important;" title="Aqui colocaremos el precio final del producto afectado por la promocion. Por ejemplo: En un 2x1, el precio seria la mitad (50% off)">
      <br>
      <label for="show">Mostrar</label>
      <input checked="${item.show}" type="checkbox" name="show" id="show" class="swal2-input">`,
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('nombre')).value,
          (<HTMLInputElement>document.getElementById('cant')).value,
          (<HTMLInputElement>document.getElementById('off')).value,
          (<HTMLInputElement>document.getElementById('show')).checked,
          (<HTMLInputElement>document.getElementById('desc')).value,
        ];
      },
    });
    let sale: Sale = {
      name: String(formValues[0]),
      show: formValues[3],
      off: Number(formValues[2]),
      cant: Number(formValues[1]),
      desc: String(formValues[4]),
    };
    this.sales[pos] = sale;
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();

    console.log(data, this.prodForm.controls['longDesc'].value);
  }

  cambiarEstado(id: string, show: boolean){
    let title: string;
    let text: string;
    if(show){
      title = '¿Estas seguro de desabilitar este producto?'
      text = 'Si desabilita este producto, nadie podra verlo, ni ponerlo en su carrito, ni aparecerá en las busquedas'
    }else{
      title = '¿Estas seguro de habilitar este producto?';
      text = 'Si habilita este producto, todos podran verlo, ponerlo en su carrito y aparecerá en las busquedas'
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ccc',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.prodService.cambiarEstadoVisual(id, show).then(()=>{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000
          })

          Toast.fire({
            title: 'Actualizado!',
            text: 'El producto ha sido correctamente actualizado de la base de datos.',
            icon: 'success'
          })
        })
      }
    })
  }

  revisarAgregarCat(event){
    if(event){
      this.agregarCategoria(event.name, event.id)
    }
  }

  // lista = listaCompleta;

  // cargarLista(){
  //  this.lista.forEach((prod)=>{
  //   this.prodService.cargarLista(prod).then((data)=>{
  //     console.log(data);
      
  //   }).catch((err)=>{
  //   console.log('Error: ', err);
  //   });
  //  })
  // }

}
