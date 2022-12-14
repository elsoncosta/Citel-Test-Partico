import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';

import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent implements OnInit {

  id!: string;

  produto: Produto = new Produto();

  constructor(
    private categoriaService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
   
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoriaService.obterPorId(this.id)
      .subscribe(categoria => this.produto = categoria.data);
    });
  }

  excluirEvento() {
    this.categoriaService.excluirCliente(this.produto.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        error => { this.falha() }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Dados excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/index']);
      });
    }
  }

  falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
