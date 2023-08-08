import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Colecao } from "src/app/interfaces/colecao";
import { Usuario } from "src/app/interfaces/usuario";
import { HttpService } from "src/app/services/http.service";
import { DialogCollectionComponent } from "../dialog-collection/dialog-collection.component";

@Component({
	selector: "app-collection",
	templateUrl: "./collection.component.html",
	styleUrls: ["./collection.component.css"],
})
export class CollectionComponent implements OnInit {
	usuario!: Usuario;

	constructor(private http: HttpService, private router: Router, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.http.getUsuario().subscribe({
			next: (result: Usuario) => {
				console.log(result);
				this.usuario = result;
			},
			error: () => this.navigateLogin(),
		});
	}

	openDialogCollection(): void {
		const dialogRef = this.dialog.open(DialogCollectionComponent, {
			data: { titulo: null, quadros: [] },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result.titulo !== null) {
				const colecao: Colecao = {
					titulo: result.titulo,
					quadros: result.quadros,
				};
				this.usuario.colecoes.push(colecao);
				this.http.updateCollection(this.usuario.colecoes).subscribe({
					next: (result: Usuario) => {
						this.usuario = result;
						console.log(result);
					},
				});
			}
		});
	}

	navigateLogin(): void {
		this.router.navigate(["/login"]);
	}

	onDelete(index: number): void {
		this.usuario.colecoes.splice(index, 1);
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
