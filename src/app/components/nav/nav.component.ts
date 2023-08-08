import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-nav",
	templateUrl: "./nav.component.html",
	styleUrls: ["./nav.component.css"],
})
export class NavComponent {
	@Output()
	change: EventEmitter<void> = new EventEmitter<void>();

	constructor(private route: Router) { }

	logout(): void {
		localStorage.clear();
		this.route.navigate(["/login"]);
	}

	onToggle(): void {
		this.change.emit();
	}
}
