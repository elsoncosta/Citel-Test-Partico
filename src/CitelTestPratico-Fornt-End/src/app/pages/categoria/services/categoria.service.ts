import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Categoria } from '../models/categoria';
import { ReturnCategoriaList } from "../models/return.categoria.list";
import { ReturnCategoria } from "../models/return.categoria";

@Injectable()
export class CategoriaService extends BaseService {

    categoria: Categoria = new Categoria();

    constructor(private http: HttpClient) { super() }

    obterTodos(): Observable<ReturnCategoriaList> {
        return this.http
            .get<ReturnCategoriaList>(this.UrlServiceV1 + "categorias")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<ReturnCategoria> {
        return this.http
            .get<ReturnCategoria>(this.UrlServiceV1 + "categorias/" + id, super.ObterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    Add(categoria: Categoria): Observable<Categoria> {
        return this.http
            .post(this.UrlServiceV1 + "categorias", categoria, this.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    Alter(categoria: Categoria): Observable<Categoria> {
        return this.http
            .put(this.UrlServiceV1 + "categorias/" + categoria.id, categoria, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluir(id: number): Observable<Categoria> {
        return this.http
            .delete(this.UrlServiceV1 + "categorias/" + id, super.ObterAuthHeaderJson())
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