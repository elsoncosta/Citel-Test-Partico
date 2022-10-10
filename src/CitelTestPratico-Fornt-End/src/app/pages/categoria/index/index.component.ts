import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  public categorias!: Categoria[];
  errorMessage!: string;

  constructor(private fornecedorService: CategoriaService) { }

  ngOnInit(): void {
    this.fornecedorService.obterTodos()
      .subscribe(
        result => this.categorias = result.data,
        error => this.errorMessage);
  }
}
