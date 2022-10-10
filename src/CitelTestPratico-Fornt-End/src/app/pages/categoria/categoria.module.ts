import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';

import { NarikCustomValidatorsModule } from '@narik/custom-validators';

import { CategoriaAppComponent } from './categoria.app.component';
import { CategoriaRoutingModule } from './categoria.route';

import { CategoriaService } from './services/categoria.service';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    CategoriaAppComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    DeleteComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NarikCustomValidatorsModule,
    TextMaskModule,
    NgBrazil,
    NgbModule
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriaModule { }