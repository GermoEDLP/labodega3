import { Component, OnInit } from '@angular/core';
import { CatsService } from '../../services/cats.service';
import { OptionsService } from '../../services/options.service';
import { Category, Options } from '../../interfaces/interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  cats: Category[];
  opt: Options;

  constructor(private catSvc: CatsService, private optSvc: OptionsService) { }

  ngOnInit(): void {
    this.arranque();
  }

  arranque(){
    this.catSvc.getCats().pipe(take(1)).subscribe((cats: Category[])=>{
      this.cats = cats;
    });
    this.optSvc.getOptions().pipe(take(1)).subscribe((opt: Options)=>{
      this.opt = opt;
    })
  }

}
