import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria';

import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent implements OnInit {

  id!: string;

  categoria: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.categoriaService.obterPorId(this.id)
      .subscribe(categoria => this.categoria = categoria.data);
    });
  }

  excluirEvento() {
    this.categoriaService.excluir(this.categoria.id)
      .subscribe(
        evento => { this.sucessoExclusao(evento) },
        error => { this.falha() }
      );
  }

  sucessoExclusao(evento: any) {

    const toast = this.toastr.success('Dados excluido com Sucesso!', 'Good bye :D');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/categorias/index']);
      });
    }
  }

  falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
