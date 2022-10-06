import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';

import { NarikCustomValidatorsModule } from '@narik/custom-validators';

import { FornecedorAppComponent } from './fornecedor.app.component';
import { FornecedorRoutingModule } from './fornecedor.route';

import { FornecedorService } from './services/fornecedor.service';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    FornecedorAppComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    DeleteComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NarikCustomValidatorsModule,
    TextMaskModule,
    NgBrazil,
    NgbModule
  ],
  providers: [
    FornecedorService
  ]
})
export class FornecedorModule { }