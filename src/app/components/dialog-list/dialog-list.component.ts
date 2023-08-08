import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogoListData {
	titulo: string;
}

@Component({
	selector: "app-dialog-list",
	templateUrl: "./dialog-list.component.html",
	styleUrls: ["./dialog-list.component.css"],
})
export class DialogListComponent {
	constructor(
		public dialogRef: MatDialogRef<DialogListComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogoListData,
	) {}
}
