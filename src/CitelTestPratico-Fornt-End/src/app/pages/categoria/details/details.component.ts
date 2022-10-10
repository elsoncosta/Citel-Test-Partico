import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';

import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-datails',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  id!: string;
  categoria: Categoria = new Categoria();

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: CategoriaService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.fornecedorService.obterPorId(this.id)
    .subscribe(result => this.categoria = result.data);
  }
}
