import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogoTaskData {
	conteudo: string;
}

@Component({
	selector: "app-dialog-task",
	templateUrl: "./dialog-task.component.html",
	styleUrls: ["./dialog-task.component.css"],
})
export class DialogTaskComponent {
	constructor(
		public dialogRef: MatDialogRef<DialogTaskComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogoTaskData,
	) {}
}
