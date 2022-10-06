import { AccountAppComponent } from './../../pages/account/account.app.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';


export const AuthLayoutRoutes: Routes = [
        // { path: '',      component: AccountAppComponent },
        {
                path: '',
                loadChildren: () => import('../../pages/account/account.module')
                .then(m => m.AccountModule)
        },
        {path: 'nao-encontrado', component: NotFoundComponent},
        {path: '**', component: NotFoundComponent}
];