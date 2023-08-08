import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	controlEmail = new FormControl("", [Validators.email, Validators.required]);
	controlSenha = new FormControl("", Validators.required);

	constructor(private http: HttpService, private router: Router) { }

	ngOnInit(): void {
		if (localStorage.getItem("token") !== null) {
			this.http.getUsuario().subscribe({ next: () => this.navigateHome() });
		}
	}

	onSubmit(): void {
		if (
			this.controlEmail.valid &&
			this.controlEmail.value !== null &&
			this.controlSenha.valid &&
			this.controlSenha.value !== null
		) {
			this.http
				.login(this.controlEmail.value, this.controlSenha.value)
				.subscribe({
					next: (result) => {
						console.log(result);

						this.setToken(result.headers.get("Authorization"));
						this.navigateHome();
					},
					error: (erro: HttpErrorResponse) => console.log(erro.error.msg),
				});
		}
	};

	setToken(token: string | null): void {
		if (token !== null) {
			localStorage.setItem("token", token);
		}
	}

	navigateHome(): void {
		this.router.navigate(["/home"]);
	}
	navigateRegister() {
		this.router.navigate(["/register"]);
	}

	navigateForgot() {
		this.router.navigate(["/forgot"]);
	}
}
