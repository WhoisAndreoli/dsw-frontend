import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/usuario";
import { Quadro } from "../interfaces/quadro";
import { Colecao } from "../interfaces/colecao";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	url = "http://localhost:8085/api/v1";
	token: any;
	constructor(private http: HttpClient) { }

	login(email: string, senha: string) {
		return this.http.post(
			`${this.url}/usuario/login`,
			{ email: email, senha: senha },
			{ observe: "response", responseType: "json" },
		);
	}

	getUsuario(): Observable<Usuario> {
		this.token = localStorage.getItem("token");
		return this.http.get<Usuario>(`${this.url}/usuario/get`, {
			headers: { Authorization: this.token },
		});
	}

	createUsuario(
		email: string,
		senha: string,
		nome: string,
	): Observable<Usuario> {
		const body = {
			email: email,
			senha: senha,
			nome: nome,
		};
		return this.http.post<Usuario>(`${this.url}/usuario/create`, body);
	}

	updateQuadro(quadro: Quadro, id: string | null): Observable<Quadro> {
		this.token = localStorage.getItem("token");
		return this.http.put<Quadro>(`${this.url}/quadro/update/${id}`, quadro, {
			headers: { Authorization: this.token },
		});
	}

	createQuadro(
		titulo: string,
		corFundo: string,
		corTexto: string,
	): Observable<Quadro> {
		const body = {
			titulo: titulo,
			corFundo: corFundo,
			corTexto: corTexto,
		};
		this.token = localStorage.getItem("token");
		return this.http.post<Quadro>(`${this.url}/quadro/create`, body, {
			headers: { Authorization: this.token },
		});
	}

	deleteQuadro(id: string) {
		this.token = localStorage.getItem("token");
		return this.http.delete(`${this.url}/quadro/delete/${id}`, {
			headers: { Authorization: this.token },
		});
	}

	forgot(email: string) {
		return this.http.post(`${this.url}/usuario/forgot/${email}`, {});
	}

	reset(
		email: string,
		senha: string,
		senhaRepetida: string,
		expiracao: string,
	): Observable<Usuario> {
		const body = {
			email: email,
			senha: senha,
			senhaRepetida: senhaRepetida,
			expiracao: expiracao,
		};
		return this.http.post<Usuario>(`${this.url}/usuario/reset`, body);
	}

	favorite(id: any) {
		this.token = localStorage.getItem("token");
		return this.http.post(
			`${this.url}/quadro/favorite/${id}`,
			{},
			{ headers: { Authorization: this.token } },
		);
	}

	unfavorite(id: any) {
		this.token = localStorage.getItem("token");
		return this.http.delete(`${this.url}/quadro/favorite/${id}`, {
			headers: { Authorization: this.token },
		});
	}

	share(id: any, permissao: boolean, email: string) {
		const body = {
			quadroID: id,
			editavel: permissao,
			email: email,
		};
		return this.http.post(`${this.url}/quadro/share`, body, {
			headers: { Authorization: this.token },
		});
	}

	updateCollection(colecoes: Colecao[]): Observable<Usuario> {
		const body = {
			colecoes: colecoes,
		};
		return this.http.post<Usuario>(`${this.url}/usuario/collection`, body, {
			headers: { Authorization: this.token },
		});
	}
}
