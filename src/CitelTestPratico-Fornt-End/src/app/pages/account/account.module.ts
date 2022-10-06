import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { AccountRoutingModule } from './account.route';
import { AccountAppComponent } from './account.app.component';
import { RegisterComponent } from './register/register.component';

import { AccountService } from './services/account.services';
import { AccountGuard } from './services/account.guard';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AccountAppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NarikCustomValidatorsModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ]
})
export class AccountModule { }