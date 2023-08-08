import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-collection-boards",
	templateUrl: "./collection-boards.component.html",
	styleUrls: ["./collection-boards.component.css"],
})
export class CollectionBoardsComponent implements OnInit {
	usuario!: Usuario;
	index!: number;
	constructor(
		private http: HttpService, private router: Router, private actvatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this.index = parseInt(this.actvatedRoute.snapshot.paramMap.get("id")!);
		this.http.getUsuario().subscribe({
			next: (result: Usuario) => {
				this.usuario = result;
			},
			error: () => this.navigateLogin(),
		});
	}

	navigateLogin(): void {
		this.router.navigate(["/login"]);
	}

	onDelete(i: number): void {
		this.usuario.colecoes[this.index].quadros.splice(i, 1);
		this.http.updateCollection(this.usuario.colecoes).subscribe({
			next: (result: Usuario) => {
				this.usuario = result;
			},
			error: (erro: HttpErrorResponse) => console.log(erro),
		});
	}

	logout(): void {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}
}
