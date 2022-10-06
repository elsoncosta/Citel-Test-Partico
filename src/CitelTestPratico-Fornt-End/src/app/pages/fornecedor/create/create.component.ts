import { StringUtils } from './../../../utils/string-utils';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';               

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { Categoria } from '../models/categoria';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  form!: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  pesquisaCep: boolean = false;
  categorias!: Categoria[];

  MASKS = utilsBr.MASKS;
  formResult: string = '';

  mudancasNaoSalvas!: boolean;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
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
    
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      codigoBarra: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
      categoriasIds: ['', [Validators.required]]
    });

    this.form.patchValue({tipoFornecedor: '1', ativo: true});

    this.GetCategorias();
  }

  ngAfterViewInit(): void {
    this.tipoform().valueChanges
        .subscribe(() => {
          this.configurarElementosValidacao();
          this.validarFormulario();
        });
    this.configurarElementosValidacao();
    this.fornecedorService.obterTodos()
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

  tipoform(): AbstractControl {
    return this.form.get('tipoFornecedor')!;
  }

  documento(): AbstractControl {
    return this.form.get('documento')!;
  }

  GetCategorias() {
    this.fornecedorService.GetListCategoria()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.categorias = result.data;
        },
        error: (result) => {
          this.errors.push(result);
          this.toastr.error('Ocorreu um erro!', "Categorias não localizadas.");
        }
        });
  }  

   adicionarFornecedor() {
    if (this.form.dirty && this.form.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.form.value);
      this.formResult = JSON.stringify(this.fornecedor);

      console.log(this.fornecedor);

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe({
          next: (sucesso) => { this.processarSucesso(sucesso) },
          error: (error) => { this.processarFalha(error) }
        });

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.form.reset();
    this.errors = [];

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/index']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}