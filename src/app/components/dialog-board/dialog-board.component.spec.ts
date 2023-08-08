import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogBoardComponent } from "./dialog-board.component";

describe("DialogBoardComponent", () => {
	let component: DialogBoardComponent;
	let fixture: ComponentFixture<DialogBoardComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DialogBoardComponent],
		});
		fixture = TestBed.createComponent(DialogBoardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
