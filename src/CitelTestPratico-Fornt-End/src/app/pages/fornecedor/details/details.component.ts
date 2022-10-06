import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-datails',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {

  id!: string;
  fornecedor: Fornecedor = new Fornecedor();

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService) {

      this.fornecedorService.obterPorId(this.id)
      .subscribe(fornecedor => this.fornecedor = fornecedor);
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }
}
