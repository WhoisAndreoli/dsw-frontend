import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Quadro } from "src/app/interfaces/quadro";
import { HttpService } from "src/app/services/http.service";

export interface DialogoCollectionData {
	titulo: string;
	quadros: [];
}

@Component({
	selector: "app-dialog-collection",
	templateUrl: "./dialog-collection.component.html",
	styleUrls: ["./dialog-collection.component.css"],
})
export class DialogCollectionComponent implements OnInit {
	quadros!: Quadro[];

	constructor(
		public dialogRef: MatDialogRef<DialogCollectionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogoCollectionData,
		private http: HttpService) { }

	ngOnInit(): void {
		this.http.getUsuario().subscribe({
			next: (result) => {
				this.quadros = result.quadros;
				for (const comp of result.compartilhados) {
					if (comp.quadro !== null) {
						this.quadros.push(comp.quadro);
					}
				}
			},
		});
	}
}
