import { Lista } from "./lista";
import { Usuario } from "./usuario";

export interface Quadro {
	id: string;
	titulo: string;
	corFundo: string;
	corTexto: string;
	usuario: Usuario;
	listas: Lista[];
}
