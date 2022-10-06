import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {
        path: 'fornecedores',
        loadChildren: () => import('../../pages/fornecedor/fornecedor.module')
        .then(m => m.FornecedorModule)
    }
];