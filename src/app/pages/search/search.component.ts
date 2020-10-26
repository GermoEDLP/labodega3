import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Product, Category, FilterCat } from '../../interfaces/interfaces';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CatsService } from '../../services/cats.service';
import { environment } from '../../../environments/environment.prod';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  lista: Product[] = [];
  cats: Category[];
  termino: string;
  codigo: string;
  categoria: string[] = null;
  categoriasFiltradas: FilterCat[];
  prodsCat: Product[];
  porPrecio: any = null
  precios = environment.price;
  stop$: Subject<void> = new Subject<void>();

  constructor(
    private _prodService: ProductosService,
    private catsSvc: CatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      this.porPrecio = null;
      if (event instanceof NavigationEnd) {
        this.arranque();
      }
    });
  }

  async arranque() {
    window.scrollTo(0,0);
    this.termino = null;
    this.categoria = [];
    let cod: string = this.route.snapshot.paramMap.get('cod');
    this.codigo = cod;
    let price: string = this.route.snapshot.paramMap.get('price')
    if (cod.includes('categorie')) {
      cod = cod.slice(9);
      this.categoria[0] = cod;
      this._prodService
        .getProductByCat(this.categoria[0]).pipe(takeUntil(this.stop$))
        .subscribe((prodsCat: Product[]) => {
          if(price){
            this.porPrecio = Number(price);
            this.prodsCat = prodsCat.filter((prod: Product)=>prod.price>this.precios[price].min && prod.price<=this.precios[price].max);
          }else{
            this.prodsCat = prodsCat;
          }
        });
    }else if(cod.includes('promo')){
      cod = cod.slice(5);
      this.termino = cod;
      this._prodService.getProducts().pipe(takeUntil(this.stop$)).subscribe((lista: Product[]) => {
        this.lista = lista;
        
      });
    } else {
      this.termino = cod;
      this._prodService.getProducts().pipe(takeUntil(this.stop$)).subscribe((lista: Product[]) => {
        this.lista = lista;
        
      });
    }
    this.catsSvc.getCats().pipe(takeUntil(this.stop$)).subscribe(async (cats: Category[]) => {
      this.cats = await cats;
      this.categoriasFiltradas = this.buscarCategoriasPorTermino(cod, cats);
    });
  }

  ngOnInit(): void {}

  buscarProductosPorTermino(termino: string, prods: Product[]): Product[] {
    termino = termino.toLocaleLowerCase();
    return prods.filter((prod: Product) => {
      return (
        prod.name.toLocaleLowerCase().includes(this.termino) ||
        prod.desc.toLocaleLowerCase().includes(this.termino)
      );
    });
  }

  buscarCategoriasPorTermino(termino: string, cats: Category[]): FilterCat[] {
    termino = termino.toLocaleLowerCase();
    let filtrado: FilterCat[] = [];
    cats.forEach((cat: Category) => {
      if (cat.name.toLocaleLowerCase().includes(termino)) {
        filtrado.push({
          cat: cat.name,
          id: 'categorie' + cat.id,
        });
      } else {
        cat.subs.forEach((subcat, index) => {
          if (subcat.toLocaleLowerCase().includes(termino)) {
            filtrado.push({
              cat: subcat,
              id: 'categorie' + cat.id + 'subs' + index,
            });
          }
        });
      }
    });
    return filtrado;
  }

  ngOnDestroy(){
    this.stop$.next();
    this.stop$.complete();
  }

}
