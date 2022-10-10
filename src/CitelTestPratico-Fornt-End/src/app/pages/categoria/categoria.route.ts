import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaAppComponent } from './categoria.app.component';

import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';

const categoriaRouterConfig: Routes = [
    {
        path: '', component: CategoriaAppComponent,
        children: [
            { path: 'index', component: IndexComponent },
            { path: 'create', component: CreateComponent },
            { path: 'edit/:id', component: EditComponent },
            { path: 'details/:id', component: DetailsComponent },
            { path: 'delete/:id', component: DeleteComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(categoriaRouterConfig)
    ],
    exports: [RouterModule]
})
export class CategoriaRoutingModule { }