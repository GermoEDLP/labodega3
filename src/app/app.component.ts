import { Component } from '@angular/core';
import { CatsService } from './services/cats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La Bodega';

  constructor(private sideBar: CatsService){
    sideBar.guardarMenu();
  }
}
