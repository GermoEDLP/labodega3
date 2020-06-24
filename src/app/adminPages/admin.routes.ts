import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProdListComponent } from './prod-list/prod-list.component';





const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'list', component: ProdListComponent, data: { titulo: 'Lista de productos' } },
            {path: '', component: ProdListComponent}
        ]
    }
];


export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );