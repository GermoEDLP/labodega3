import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Product, Category, FilterCat } from '../../interfaces/interfaces';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CatsService } from '../../services/cats.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  lista: Product[] = [];
  cats: Category[];
  termino: string;
  categoria: string[];
  categoriasFiltradas: FilterCat[];
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
    this.categoria = [];
    let cod: any = this.route.snapshot.paramMap.get('cod');
    if (cod.includes('categorie')) {
      cod = cod.slice(9);
      this.categoria[0] = cod;
      this._prodService
        .getProductByCat(this.categoria[0])
        .subscribe((prodsCat: Product[]) => {
          this.prodsCat = prodsCat;
        });
    } else {
      this.termino = cod;
      this._prodService.getProducts().subscribe((lista: Product[]) => {
        this.lista = this.buscarProductosPorTermino(cod, lista);
      });
    }
    this.catsSvc.getCats().subscribe(async (cats: Category[]) => {
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
}
