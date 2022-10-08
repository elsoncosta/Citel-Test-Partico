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
    private fornecedorService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.fornecedorService.obterPorId(this.id)
      .subscribe(fornecedor => this.produto = fornecedor.data);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  excluirEvento() {
    this.fornecedorService.excluirCliente(this.produto.id)
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
