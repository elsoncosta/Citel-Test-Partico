import { Categoria } from "./categoria";

export class Produto {
    id!: string;
    nome!: string;
    codigoBarra!: string;
    ativo!: boolean;
    descricao!: string;
    uriImageDefault!: string;
    categoriasIds!: number[];
    categorias!: Categoria[];
}

