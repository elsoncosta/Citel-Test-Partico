import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Produto } from '../models/produto';
import { Categoria } from '../models/categoria';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  errorsEndereco: any[] = [];
  form!: FormGroup;

  produto: Produto = new Produto();
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
    private produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

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
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    this.form = this.fb.group(
      {
        id: ['', [Validators.required]],
        nome: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        codigoBarra: ['', [Validators.required]],
        ativo: ['', [Validators.required]],
        categoriasIds: [null, [Validators.required]]
      });

      this.produtoService.obterPorId(this.id)
      .subscribe(result => {
        this.produto = result.data;
        this.form.patchValue(this.produto);
      });

      this.GetCategorias();
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
      this.produto = Object.assign({}, this.produto, this.form.value);

      let ids: number[] = [Number(this.categoriaSelecionada)];
      this.produto.categoriasIds = ids;
      this.produto.uriImageDefault = 'https://cdn2.iconfinder.com/data/icons/facebook-ui-colored/48/JD-24-512.png'

      this.produtoService.AlterCliente(this.produto)
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

  GetCategorias() {
    this.produtoService.GetListCategoria()
      .subscribe(
        result => {
          this.categorias = result.data;
          console.log(this.produto.nome);
          console.log(this.produto.categorias[0].descricao);
          let ids: number[] = [this.produto.categorias[0].id];
          this.form.patchValue({categoriasIds: ids});
        },
        error => {
                  this.errors.push(error);
                  this.toastr.error('Ocorreu um erro!', "Categorias não localizadas.");
                }
      );
  }

  processarSucesso(response: any) {
    this.errors = [];

    let toast = this.toastr.success('Produto atualizado com sucesso!', 'Sucesso!');
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
