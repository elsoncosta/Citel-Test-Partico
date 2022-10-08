import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { Categoria } from '../models/categoria';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  form!: FormGroup;
  produto: Produto = new Produto();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  pesquisaCep: boolean = false;
  categorias!: Categoria[];
  categoriaSelecionada!: number;

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  mudancasNaoSalvas!: boolean;

  constructor(private fb: FormBuilder,
    private fornecedorService: ProdutoService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      categoriasIds: {
        required: 'Informe uma categoria'
      },
      descricao: {
        required: 'Informe a descriçao',
      },
      codigoBarra: {
        required: 'Informe o código de barras',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.form = this.fb.group(
      {
        nome: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        codigoBarra: ['', [Validators.required]],
        ativo: ['', [Validators.required]],
        categoriasIds: [null, [Validators.required]]
      });

    this.form.patchValue({ativo: true});
  }

  ngAfterViewInit(): void {
    // this.configurarElementosValidacao();
    // this.validarFormulario();
    // this.configurarElementosValidacao();
    this.GetCategorias();
  }

  configurarElementosValidacao() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario();
    });
  }

  validarFormulario() {
    this.displayMessage = this.genericValidator.processarMensagens(this.form);
    this.mudancasNaoSalvas = true;
  }

  GetCategorias() {
    this.fornecedorService.GetListCategoria()
      .subscribe(
        result => this.categorias = result.data,
        error => {
                  this.errors.push(error);
                  this.toastr.error('Ocorreu um erro!', "Categorias não localizadas.");
                }
      );
  }

   adicionar() {
    if (this.form.dirty && this.form.valid) {
      this.produto = Object.assign({}, this.produto, this.form.value);
      let ids: number[] = [Number(this.categoriaSelecionada)];
      this.produto.categoriasIds = ids;
      this.produto.uriImageDefault = 'https://cdn2.iconfinder.com/data/icons/facebook-ui-colored/48/JD-24-512.png'
      this.formResult = JSON.stringify(this.produto);
      console.log(this.produto);
      this.fornecedorService.AddCliente(this.produto)
        .subscribe({
          next: (sucesso) => { this.processarSucesso(sucesso) },
          error: (error) => { this.processarFalha(error) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  onSelectCategoria(e: any)
  {
    this.categoriaSelecionada = e.target.value;
  }

  processarSucesso(response: any) {
    this.form.reset();
    this.errors = [];

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/index']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}