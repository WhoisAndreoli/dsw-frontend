import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DialogCollectionComponent } from "./dialog-collection.component";

describe("DialogCollectionComponent", () => {
	let component: DialogCollectionComponent;
	let fixture: ComponentFixture<DialogCollectionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DialogCollectionComponent],
		});
		fixture = TestBed.createComponent(DialogCollectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
