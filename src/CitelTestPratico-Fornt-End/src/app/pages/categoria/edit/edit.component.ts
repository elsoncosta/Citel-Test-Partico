import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  form!: FormGroup;

  categoria: Categoria = new Categoria();
  categorias!: Categoria[];
  categoriaSelecionada!: number;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento: string = '';

  formResult: string = '';
  id!: string;

  mudancasNaoSalvas!: boolean;

  constructor(private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

      this.validationMessages = {
        descricao: {
          required: 'Informe a descriçao',
        }
      };
  

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    this.form = this.fb.group(
      {
        id: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        // ativo: ['', [Validators.required]],
      });

      this.categoriaService.obterPorId(this.id)
      .subscribe(result => {
        this.categoria = result.data;
        console.log(this.categoria);
        this.form.patchValue(this.categoria);
      });
  }

  ngAfterViewInit() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.form);
      this.mudancasNaoSalvas = true;
    });
  }

  editar() {
    if (this.form.dirty && this.form.valid) {
      this.categoria = Object.assign({}, this.categoria, this.form.value);

      let ids: number[] = [Number(this.categoriaSelecionada)];
      this.categoriaService.Alter(this.categoria)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  onSelectCategoria(e: any)
  {
    this.categoriaSelecionada = e.target.value;
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Categoria atualizado com sucesso!', 'Sucesso!');
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
