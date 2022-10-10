import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { utilsBr } from 'js-brasil';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  form!: FormGroup;
  categoria: Categoria = new Categoria();

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
    private fornecedorService: CategoriaService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      descricao: {
        required: 'Informe a descriçao',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.form = this.fb.group(
      {
        descricao: ['', [Validators.required]],
        // ativo: ['', [Validators.required]],
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
      this.categoria = Object.assign({}, this.categoria, this.form.value);
      this.formResult = JSON.stringify(this.categoria);
      console.log(this.categoria);
      this.fornecedorService.Add(this.categoria)
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

    let toast = this.toastr.success('Categoria cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/categorias/index']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}