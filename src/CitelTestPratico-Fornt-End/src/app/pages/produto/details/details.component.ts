import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';

import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-datails',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  id!: string;
  produto: Produto = new Produto();

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: ProdutoService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.fornecedorService.obterPorId(this.id)
    .subscribe(result => this.produto = result.data);
  }
}
