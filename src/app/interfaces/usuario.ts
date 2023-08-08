import { Colecao } from "./colecao";
import { Compartilhamento } from "./compartilhamento";
import { Quadro } from "./quadro";

export interface Usuario {
	id: string;
	nome: string;
	email: string;
	senha: string;
	quadros: Quadro[];
	favoritos: Quadro[];
	compartilhados: Compartilhamento[];
	colecoes: Colecao[];
}
