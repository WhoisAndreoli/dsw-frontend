import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogoShareData {
	email: string;
	isChecked: string;
}

@Component({
	selector: "app-dialog-share",
	templateUrl: "./dialog-share.component.html",
	styleUrls: ["./dialog-share.component.css"],
})
export class DialogShareComponent {
	constructor(
		public dialogRef: MatDialogRef<DialogShareComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogoShareData,
	) {}
}
