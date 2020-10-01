//Modulos de Angular
import { RouterModule, Routes } from '@angular/router';

//Modulos propios

//Modulos externos

//Componentes
import { PagesComponent } from './pages.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { BuyComponent } from './buy/buy.component';
import { InfoComponent } from './buy/info/info.component';
import { ShippComponent } from './buy/shipp/shipp.component';
import { PayComponent } from './buy/pay/pay.component';
import { ConfirmComponent } from './buy/confirm/confirm.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';

//Otros





const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'contact', component: ContactComponent, data: { titulo: 'Contacto' } }, 
            { path: 'product/:cod', component: ProductComponent, data: { titulo: 'Producto' } },            
            { path: 'search/:cod', component: SearchComponent, data: { titulo: 'Buscar' } },
            { path: 'home', component: HomeComponent, data: { titulo: 'Inicio' } },
            { path: 'cart', component: CartComponent, data: { titulo: 'Carrito' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil' } },
            { path: 'buy', component: BuyComponent, 
            children: [
                { path: 'info', component: InfoComponent, data: { titulo: 'Información del cliente' } },
                { path: 'shipp', component: ShippComponent, data: { titulo: 'Información del Envio' } },
                { path: 'pay', component: PayComponent, data: { titulo: 'Información del Pago' } },
                { path: 'confirm', component: ConfirmComponent, data: { titulo: 'Confirmación del pago' } },
            ],
            data: { titulo: 'Compra' } },
            {path: '', component: HomeComponent}
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );