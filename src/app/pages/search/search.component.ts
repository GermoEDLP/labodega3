import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Product, Category } from '../../interfaces/interfaces';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CatsService } from '../../services/cats.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  lista: Product[] = [];
  cats: Category[];
  termino: string;
  categoria: string;
  prodsCat: Product[];

  constructor(
    private _prodService: ProductosService,
    private catsSvc: CatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.arranque();
      }
    });
  }

  async arranque() {
    this.termino = null;
    this.categoria = null;
    let cod: any = this.route.snapshot.paramMap.get('cod');
    if(cod.includes('categorie')){
      cod = cod.slice(9);
      this.categoria = cod;
      this._prodService.getProductByCat(this.categoria).subscribe((prodsCat: Product[])=>{
        this.prodsCat = prodsCat;
      })
    }else{
      this.termino = cod;
      this._prodService.getProducts().subscribe((lista: Product[]) => {
        this.lista = lista;
      });      
    }     
    this.catsSvc.getCats().subscribe(async(cats: Category[])=>{
      this.cats = await cats;      
    });
  }

  ngOnInit(): void {}
   
}
