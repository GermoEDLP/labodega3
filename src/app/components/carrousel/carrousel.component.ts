import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { Slider } from '../../interfaces/interfaces';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {

  sliders: Slider[];




  constructor(private sliderScv: SliderService, private render: Renderer2) { }

  ngOnInit(): void {
    this.sliderScv.getSliders().subscribe((sliders: Slider[])=>{
      this.sliders = sliders;
      console.log(sliders);
    })
    
  }



}
