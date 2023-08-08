import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
	controlEmail = new FormControl("", [Validators.email, Validators.required]);
	controlSenha = new FormControl("", Validators.required);
	controlNome = new FormControl("", Validators.required);

	constructor(private http: HttpService, private route: Router) { }

	onSubmit(): void {
		if (
			this.controlEmail.valid &&
			this.controlEmail.value !== null &&
			this.controlSenha.valid &&
			this.controlSenha.value !== null &&
			this.controlNome.valid &&
			this.controlNome.value !== null
		) {
			this.http
				.createUsuario(
					this.controlEmail.value,
					this.controlSenha.value,
					this.controlNome.value,
				)
				.subscribe({
					next: () => this.navigateLogin(),
					error: (erro: HttpErrorResponse) => console.log(erro.error.msg),
				});
		}
	}

	navigateLogin(): void {
		this.route.navigate(["/login"]);
	}
}
