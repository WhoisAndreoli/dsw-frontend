import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogoBoardData {
	titulo: string;
	corFundo: string;
	corTexto: string;
}

@Component({
	selector: "app-dialog-board",
	templateUrl: "./dialog-board.component.html",
	styleUrls: ["./dialog-board.component.css"],
})
export class DialogBoardComponent {
	constructor(
		public dialogRef: MatDialogRef<DialogBoardComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogoBoardData,
	) {}
}
