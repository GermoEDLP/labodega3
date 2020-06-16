import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProdCardComponent } from './prod-card/prod-card.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ProdCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ProdCardComponent
  ]
})
export class ComponentsModule { }
