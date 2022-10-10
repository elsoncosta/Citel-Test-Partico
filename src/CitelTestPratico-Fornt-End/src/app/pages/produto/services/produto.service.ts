import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Produto } from '../models/produto';
import { ReturnProdutoList } from "../models/return.produto.list";
import { ReturnProduto } from "../models/return.produto";
import { ReturnCategoria } from "../../categoria/models/return.categoria";
import { ReturnCategoriaList } from "../../categoria/models/return.categoria.list";

@Injectable()
export class ProdutoService extends BaseService {

    fornecedor: Produto = new Produto();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<ReturnProdutoList> {
        return this.http
            .get<ReturnProdutoList>(this.UrlServiceV1 + "produtos")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<ReturnProduto> {
        return this.http
            .get<ReturnProduto>(this.UrlServiceV1 + "produtos/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    AddCliente(fornecedor: Produto): Observable<Produto> {
        return this.http
            .post(this.UrlServiceV1 + "produtos", fornecedor, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    AlterCliente(fornecedor: Produto): Observable<Produto> {
        return this.http
            .put(this.UrlServiceV1 + "produtos/" + fornecedor.id, fornecedor, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirCliente(id: string): Observable<Produto> {
        return this.http
            .delete(this.UrlServiceV1 + "produtos/" + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    GetListCategoria(): Observable<ReturnCategoriaList> {
        return this.http
            .get<ReturnCategoriaList>(this.UrlServiceV1 + "categorias")
            .pipe(catchError(super.serviceError));
    }
}