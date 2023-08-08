import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent {
	controlEmail = new FormControl("", [Validators.email, Validators.required]);

	constructor(private http: HttpService) { }

	onSubmit(): void {
		if (this.controlEmail.valid && this.controlEmail.value !== null) {
			this.http.forgot(this.controlEmail.value).subscribe({
				next: (result) => {
					console.log(result);
				},
				error: (erro: HttpErrorResponse) => console.log(erro.error.msg),
			});
		}
	};
}
