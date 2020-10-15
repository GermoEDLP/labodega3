import { Component, OnInit } from '@angular/core';
import { Options } from 'src/app/interfaces/interfaces';
import { OptionsService } from '../../services/options.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  options: Options;

  constructor(private optSvc: OptionsService) { }

  ngOnInit(): void {
    this.optSvc.getOptions().pipe(take(1)).subscribe((data: Options)=>{
      this.options = data;
    })
  }

  up(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
