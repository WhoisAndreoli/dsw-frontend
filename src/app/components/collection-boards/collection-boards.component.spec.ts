import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CollectionBoardsComponent } from "./collection-boards.component";

describe("CollectionBoardsComponent", () => {
	let component: CollectionBoardsComponent;
	let fixture: ComponentFixture<CollectionBoardsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CollectionBoardsComponent],
		});
		fixture = TestBed.createComponent(CollectionBoardsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
