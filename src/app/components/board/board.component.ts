import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Lista } from "src/app/interfaces/lista";
import { Quadro } from "src/app/interfaces/quadro";
import { Tarefa } from "src/app/interfaces/tarefa";
import { HttpService } from "src/app/services/http.service";
import { DialogListComponent } from "../dialog-list/dialog-list.component";
import { DialogTaskComponent } from "../dialog-task/dialog-task.component";
import { HttpErrorResponse } from "@angular/common/http";
import { DialogShareComponent } from "../dialog-share/dialog-share.component";
import { DialogBoardComponent } from "../dialog-board/dialog-board.component";
import { Usuario } from "src/app/interfaces/usuario";

@Component({
	selector: "app-board",
	templateUrl: "./board.component.html",
	styleUrls: ["./board.component.css"],
})
export class BoardComponent implements OnInit {
	quadro!: Quadro;
	id!: string | null;
	favorito!: boolean;
	editavel = true;

	constructor(private http: HttpService, private route: ActivatedRoute, private navigate: Router, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get("id");
		this.http.getUsuario().subscribe({
			next: (result: Usuario) => {
				if (result.quadros.some((quadro) => quadro.id === this.id)) {
					this.quadro = result.quadros.filter(
						(quadro) => quadro.id === this.id,
					)[0];
				} else {
					for (const comp of result.compartilhados) {
						if (comp.quadro !== null) {
							if (comp.quadro.id === this.id) {
								this.quadro = comp.quadro;
								this.editavel = comp.editavel;
							}
						}
					}
				}
				this.favorito = result.favoritos.some(
					(quadro) => quadro.id === this.id,
				);
			},
			error: () => this.navigateLogin(),
		});
	}

	dropList(event: CdkDragDrop<Lista[]>): void {
		moveItemInArray(
			this.quadro.listas,
			event.previousIndex,
			event.currentIndex,
		);
		this.http.updateQuadro(this.quadro, this.id).subscribe({
			next: (result: Quadro) => {
				this.quadro = result;
			},
		});
	}

	dropTask(event: CdkDragDrop<Tarefa[]>): void {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
			this.http.updateQuadro(this.quadro, this.id).subscribe({
				next: (result: Quadro) => {
					this.quadro = result;
				},
			});
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
			this.http.updateQuadro(this.quadro, this.id).subscribe({
				next: (result: Quadro) => {
					this.quadro = result;
				},
			});
		}
	}

	removeList(index: number): void {
		this.quadro.listas.splice(index, 1);
		this.http.updateQuadro(this.quadro, this.id).subscribe({
			next: (result: Quadro) => {
				this.quadro = result;
			},
		});
	}

	removeTask(indexList: number, indexTask: number): void {
		console.log(this.quadro.listas.at(indexList)?.tarefas.splice(indexTask, 1));
		this.http.updateQuadro(this.quadro, this.id).subscribe({
			next: (result: Quadro) => {
				this.quadro = result;
			},
		});
	}

	openDialogTask(index: number): void {
		const dialogRef = this.dialog.open(DialogTaskComponent, {
			data: { conteudo: "" },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.quadro.listas.at(index)?.tarefas.push({ conteudo: result });
				this.http.updateQuadro(this.quadro, this.id).subscribe({
					next: (result: Quadro) => {
						this.quadro = result;
					},
				});
			}
		});
	}

	openDialogList(): void {
		const dialogRef = this.dialog.open(DialogListComponent, {
			data: { titulo: "" },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.quadro.listas.push({ titulo: result, tarefas: [] });
				this.http.updateQuadro(this.quadro, this.id).subscribe({
					next: (result: Quadro) => {
						this.quadro = result;
					},
				});
			}
		});
	}

	openDialogUpdateList(index: number): void {
		const dialogRef = this.dialog.open(DialogListComponent, {
			data: { titulo: "" },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.quadro.listas.at(index)!.titulo = result;
				this.http.updateQuadro(this.quadro, this.id).subscribe({
					next: (result: Quadro) => {
						this.quadro = result;
					},
				});
			}
		});
	}

	openDialogShare(): void {
		const dialogRef = this.dialog.open(DialogShareComponent, {
			data: { email: "", isChecked: false },
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result.email) {
				this.http.share(this.id, result.isChecked, result.email).subscribe({
					error: (erro: HttpErrorResponse) => console.log(erro),
				});
			}
		});
	}
	openDialogBoard(): void {
		const dialogRef = this.dialog.open(DialogBoardComponent, {
			data: {
				titulo: null,
				corFundo: this.quadro.corFundo,
				corTexto: this.quadro.corTexto,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result.titulo !== null) {
				this.quadro.titulo = result.titulo;
			}
			if (result.corFundo !== this.quadro.corFundo) {
				this.quadro.corFundo = result.corFundo;
			}
			if (result.corTexto !== this.quadro.corTexto) {
				this.quadro.corTexto = result.corTexto;
			}
			this.http
				.updateQuadro(this.quadro, this.id)
				.subscribe({ next: (result: Quadro) => (this.quadro = result) });
		});
	}

	navigateLogin(): void {
		this.navigate.navigate(["/login"]);
	}

	favorite() {
		this.favorito = !this.favorito;
		this.http.favorite(this.id).subscribe({
			error: (erro: HttpErrorResponse) => console.log(erro.message),
		});
	}

	unfavorite() {
		this.favorito = !this.favorito;
		this.http.unfavorite(this.id).subscribe({
			error: (erro: HttpErrorResponse) => console.log(erro.message),
		});
	}
}
