import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent {
	email = "";
	expiracao = "";
	controlSenha = new FormControl("", Validators.required);
	controlSenhaRepetida = new FormControl("", Validators.required);

	constructor(private http: HttpService, private navigate: Router, private route: ActivatedRoute) { }

	onSubmit(): void {
		if (
			this.controlSenha.valid &&
			this.controlSenha.value !== null &&
			this.controlSenhaRepetida.valid &&
			this.controlSenhaRepetida.value !== null
		) {
			this.route.queryParams.subscribe((params) => {
				this.email = params["email"];
				this.expiracao = params["expiration"];
			});
			this.http
				.reset(
					this.email,
					this.controlSenha.value,
					this.controlSenhaRepetida.value,
					this.expiracao,
				)
				.subscribe({
					next: () => this.navigateLogin(),
					error: (erro: HttpErrorResponse) => console.log(erro.error.msg),
				});
		}
	}

	navigateLogin(): void {
		this.navigate.navigate(["/login"]);
	}
}
