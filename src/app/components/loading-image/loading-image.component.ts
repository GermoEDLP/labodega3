import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Sale } from '../../interfaces/interfaces';

@Component({
  selector: 'app-loading-image',
  templateUrl: './loading-image.component.html',
  styleUrls: ['./loading-image.component.css']
})
export class LoadingImageComponent implements AfterViewInit, OnInit {

  viewImage : boolean = false;  

    // Escuchamos constantemente si nuestro valor de entrada cambia.
    @Input('url') url;
    @Input('sale') sale: Sale[];
    @Input('price') price;
    @Input('unitSale') unitSale: Sale;

    // Obtenemos una referencia hacia el tag "<img>" para poder manipularlo luego
    @ViewChild("image") image: ElementRef;
    
    constructor(private render: Renderer2) { }

    async ngOnInit(){
    }

    ngAfterViewInit() {
    // Utilizaremos el evento "onload" de el tag "<img>" ,este evento se disparara
    // cuando la imagen se carge en su totalidad.
        this.image.nativeElement.onload=()=>{
            this.viewImage=true;                                    
        }
    }
    // Función que utilizaremos para comenzar el proceso de carga de imagenes, 
    // esta misma le proporcionara la dirección imagen la cual tiene que cargar.
    loadImage(urlImage){
        console.log(this.image);
        this.render.setAttribute(this.image.nativeElement, "src", urlImage);
               
    }

    

}
