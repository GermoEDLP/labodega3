import { NgModule } from '@angular/core';

// Pipes
import { CommonModule } from '@angular/common';
import { CatListaProdPipe } from './pipes/cat-lista-prod.pipe';
import { CleanCatPipe } from './pipes/clean-cat.pipe';
import { CommentShowPipe } from './pipes/comment-show.pipe';
import { FirestoreDatePipe } from './pipes/firestore-date.pipe';
import { InfoVentasPipe } from './pipes/info-ventas.pipe';
import { ProdMegaMenuPipe } from './pipes/prod-mega-menu.pipe';
import { SearchCatPipe } from './pipes/search-cat.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SliderShowPipe } from './pipes/slider-show.pipe';
import { VentasPipe } from './pipes/ventas.pipe';

const pipes = [
  CatListaProdPipe,
  CleanCatPipe,
  CommentShowPipe,
  FirestoreDatePipe,
  InfoVentasPipe,
  ProdMegaMenuPipe,
  SearchCatPipe,
  SearchPipe,
  SliderShowPipe,
  VentasPipe
]

@NgModule({
  declarations: pipes,
  imports: [
    CommonModule
  ],
  exports: pipes 
})
export class PipesModule { }
