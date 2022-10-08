import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {
        path: 'produtos',
        loadChildren: () => import('../../pages/produto/produto.module')
        .then(m => m.FornecedorModule)
    }
];