import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/fornecedor.service';
import { Fornecedor } from '../models/fornecedor';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  public fornecedores!: Fornecedor[];
  errorMessage!: string;

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.fornecedorService.obterTodos()
      .subscribe(
        fornecedores => this.fornecedores = fornecedores,
        error => this.errorMessage);
  }
}
