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
  actualizar: Slider;

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

  nuevoSlider() {
    this.newModalDisplay = true;
    this.prodsSvc.getProducts().subscribe((prods: Product[]) => {
      this.productos = prods;
    });
    this.catsSvc.getCats().subscribe((cats: Category[])=>{
      this.categorias = cats;
    })
  }

  cargarSliderParaActualizar(slider: Slider){
    this.newSliderForm.controls['title'].setValue(slider.title);
    this.newSliderForm.controls['subtitle'].setValue(slider.subtitle);
    this.imgPreview = slider.img;
    this.url = slider.url;
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
    this.actualizar = null;
    this.imgPreview = null;
    this.newSliderForm.reset();
  }

  borrarSlider(id: string) {
    Swal.fire({
      title: 'Borrar este Slider',
      text: "Estas seguro de borrar este Slider? No podrás recuperar los datos y tus usuarios no podran verlo mas en sus pantallas principales",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'      
    }).then((result) => {
      if (result.value) {
        this.sliderSvc.deleteSliderById(id);
        Swal.fire(
          'Borrado!',
          'El estado ha sido borrado correctamente.',
          'success'
        )
      }
    });
  }

  actualizarSlider(slider: Slider) {
    this.actualizar = slider;
    this.cargarSliderParaActualizar(slider);
    this.nuevoSlider();
  }

  actualizarSliderDeLaDB(){
    Swal.fire(
      {title: 'Actualizar este Slider',
      text: "Estas seguro de actualizar este Slider? Los cambios no podrán revertirse",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'}      
    ).then((result) => {
      if (result.value) {
        if(this.newImage){
          this.sliderSvc.actualizaSliderYSubeImagen({
            title: this.newSliderForm.controls['title'].value,
            subtitle: this.newSliderForm.controls['subtitle'].value,
            url: this.url,
            show: this.actualizar.show,
            id: this.actualizar.id
          }, this.newImage, false).then(()=>{
            Swal.fire(
              'Actualizado!',
              'El Slider se modifico correctamente.',
              'success'
            )
            this.cerrarModal()
          })
        }else{
          this.sliderSvc.actualizaSliderYSubeImagen({
            title: this.newSliderForm.controls['title'].value,
            subtitle: this.newSliderForm.controls['subtitle'].value,
            url: this.url,
            show: this.actualizar.show,
            id: this.actualizar.id
          }, this.imgPreview, true).then(()=>{
            Swal.fire(
              'Actualizado!',
              'El Slider se modifico correctamente.',
              'success'
            )
            this.cerrarModal()
          })
        }
        
      }
    })
   
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

  cambiarState(slider: Slider){
    let cartel;
    if(slider.show){
      cartel = {
        title: 'Deshabilitar este Slider',
        text: "Estas seguro de desabilitar este Slider? Tus usuarios no podran verlo en sus pantallas principales hasta que vuelvas a habilitarlo",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }
    }else{
      cartel = {
        title: 'Habilitar este Slider',
        text: "Estas seguro de habilitar este Slider? Tus usuarios verán este Slider tal y como puedes verlo en la vista previa.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }
    }

    Swal.fire(
      cartel      
    ).then((result) => {
      if (result.value) {
        this.sliderSvc.showOrHideById(slider);
        Swal.fire(
          'Cambiado!',
          'El estado ha sido cambiado correctamente.',
          'success'
        )
      }
    })



    
  }
}
