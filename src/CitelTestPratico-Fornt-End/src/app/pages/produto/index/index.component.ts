import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  public produtos!: Produto[];
  errorMessage!: string;

  constructor(private fornecedorService: ProdutoService) { }

  ngOnInit(): void {
    this.fornecedorService.obterTodos()
      .subscribe(
        result => this.produtos = result.data,
        error => this.errorMessage);
  }
}
