import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { HttpService } from "src/app/services/http.service";
import { DialogBoardComponent } from "../dialog-board/dialog-board.component";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
	usuario!: Usuario;

	constructor(private http: HttpService, private router: Router, private dialog: MatDialog) { }

	ngOnInit(): void {
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

	openDialogBoard(): void {
		const dialogRef = this.dialog.open(DialogBoardComponent, {
			data: { titulo: null, corFundo: "#FFFFFF", corTexto: "#000000" },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result.titulo !== null) {
				this.http
					.createQuadro(result.titulo, result.corFundo, result.corTexto)
					.subscribe({ next: (quadro) => this.navigateBoard(quadro.id) });
			}
		});
	}

	navigateBoard(id: string): void {
		this.router.navigate([`/board/${id}`]);
	}

	onDelete(id: string): void {
		this.http.deleteQuadro(id).subscribe({
			next: () => {
				this.http.getUsuario().subscribe((result) => {
					this.usuario = result;
				});
			},
		});
	}

	logout(): void {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}
}
