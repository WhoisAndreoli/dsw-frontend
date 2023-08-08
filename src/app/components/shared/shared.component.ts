import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-shared",
	templateUrl: "./shared.component.html",
	styleUrls: ["./shared.component.css"],
})
export class SharedComponent implements OnInit {
	usuario!: Usuario;

	constructor(private http: HttpService, private router: Router) { }
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

	navigateBoard(id: string): void {
		this.router.navigate([`/board/${id}`]);
	}

	onDelete(id: string): void {
		this.http.deleteQuadro(id).subscribe({
			next: () => {
				this.http.getUsuario().subscribe((result: Usuario) => {
					this.usuario = result;
				});
			},
		});
	}

	logout(): void {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}

	editavel(id: string): boolean {
		for (const comp of this.usuario.compartilhados) {
			if (comp.quadro.id === id) {
				return comp.editavel;
			}
		}
		return false;
	}
}
