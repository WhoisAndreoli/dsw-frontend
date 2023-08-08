import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "src/app/interfaces/usuario";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-favorite",
	templateUrl: "./favorite.component.html",
	styleUrls: ["./favorite.component.css"],
})
export class FavoriteComponent implements OnInit {
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

	unfavorite(id: string): void {
		this.http.unfavorite(id).subscribe({
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
			if (comp.quadro !== null) {
				if (comp.quadro.id === id) {
					return comp.editavel;
				}
			}
		}
		return true;
	}
}
