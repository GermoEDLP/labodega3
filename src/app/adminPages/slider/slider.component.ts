import { Component, OnInit } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { Slider, Product, Category, UrlSlider, FilterCat } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  sliders: Slider[];
  newModalDisplay: boolean = false;
  newSliderForm: FormGroup;
  url: UrlSlider = {
    name: ''
  };
  newImage: any;
  imgPreview: any;
  searchTerm: string = '';
  viewSearchPreview: boolean = false;
  productos: Product[];
  categorias: Category[];
  onSearchPreview: boolean = false;

  constructor(
    private sliderSvc: SliderService,
    private fb: FormBuilder,
    private prodsSvc: ProductosService,
    private catsSvc: CatsService
  ) {
    this.createSliderForm();
  }

  ngOnInit(): void {
    this.sliderSvc.getSliders().subscribe((sliders: Slider[]) => {
      this.sliders = sliders;
    });
  }

  saveAll() {}

  cargarFormulario(id?: number) {
    this.createSliderForm();
    if (id) {
    }
  }

  createSliderForm() {
    this.newSliderForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      search: [''],
    });
  }

  async nuevoSlider() {
    this.newModalDisplay = true;
    this.prodsSvc.getProducts().subscribe((prods: Product[]) => {
      this.productos = prods;
    });
    this.catsSvc.getCats().subscribe((cats: Category[])=>{
      this.categorias = cats;
    })
  }

  saveNewSlider() {  
    if(this.newSliderForm.invalid || this.url.name == '' || !this.newImage){
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        showConfirmButton: false,
        icon: 'error',
      });
    }else{
      Swal.fire({
        title: 'Espere...',
        text: 'Estamos creando su slider',
        showConfirmButton: false,
        icon: 'info',
      });
      this.sliderSvc.creaSliderYSubeImagen({
        title: this.newSliderForm.controls['title'].value,
        subtitle: this.newSliderForm.controls['subtitle'].value,
        url: this.url
      }, this.newImage, false).then(()=>{
        this.cerrarModal();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Excelente',
          html: `Tu Slider fue creado exitosamente`,
          timer: 1500,
        });
      })
    }
  }

  handleImage(event) {
    this.newImage = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    // Show preview
    var mimeType = this.newImage.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.newImage);
    reader.onload = (_event) => {
      this.imgPreview = reader.result;
      console.log(this.imgPreview);
    };
  }

  cerrarModal() {
    this.newModalDisplay = false;
    this.imgPreview = null;
    this.newSliderForm.reset();
  }

  borrarSlider(id: string) {
    console.log(id);
  }
  actualizarSlider(id: string) {
    console.log(id);
  }

  focus() {
    this.viewSearchPreview = true;
  }

  blur(event) {
    if(!this.onSearchPreview){
      this.viewSearchPreview = false;
    }
  }
  searchChange(){
    this.searchTerm = (<HTMLInputElement>document.getElementById('search')).value;
    console.log(this.searchTerm);
    
  }

  urlProd(prod: Product){
    this.url = {
      url: `/product/${prod.id}`,
      name: prod.name + ' - ' + prod.desc 
    } 
    this.newSliderForm.controls['search'].setValue(''); 
  }

  urlCat(cat: FilterCat){
    this.url = {
      url: `/search/${cat.id}`,
      name: cat.cat 
    }
    this.newSliderForm.controls['search'].setValue('');
  }
}
