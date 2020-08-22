import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { BuyComponent } from './buy/buy.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'about', component: AboutComponent, data: { titulo: 'Nosotros' } },
            { path: 'product/:cod', component: ProductComponent, data: { titulo: 'Producto' } },            
            { path: 'search/:cod', component: SearchComponent, data: { titulo: 'Buscar' } },
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' } },
            { path: 'cart', component: CartComponent, data: { titulo: 'Carrito' } },
            { path: 'buy', component: BuyComponent, data: { titulo: 'Compra' } },
            {path: '', component: HomeComponent}
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );