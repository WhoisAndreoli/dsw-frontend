import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BoardComponent } from "./components/board/board.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DialogListComponent } from "./components/dialog-list/dialog-list.component";
import { DialogTaskComponent } from "./components/dialog-task/dialog-task.component";
import { NavComponent } from "./components/nav/nav.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DialogBoardComponent } from "./components/dialog-board/dialog-board.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { FavoriteComponent } from "./components/favorite/favorite.component";
import { SharedComponent } from "./components/shared/shared.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DialogShareComponent } from "./components/dialog-share/dialog-share.component";
import { CollectionComponent } from "./components/collection/collection.component";
import { DialogCollectionComponent } from "./components/dialog-collection/dialog-collection.component";
import { MatSelectModule } from "@angular/material/select";
import { CollectionBoardsComponent } from "./components/collection-boards/collection-boards.component";
@NgModule({
	declarations: [
		LoginComponent,
		HomeComponent,
		AppComponent,
		RegisterComponent,
		BoardComponent,
		DialogListComponent,
		DialogTaskComponent,
		NavComponent,
		DialogBoardComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		FavoriteComponent,
		SharedComponent,
		DialogShareComponent,
		CollectionComponent,
		DialogCollectionComponent,
		CollectionBoardsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		HttpClientModule,
		DragDropModule,
		MatCardModule,
		MatIconModule,
		MatDialogModule,
		MatToolbarModule,
		MatSidenavModule,
		MatSlideToggleModule,
		MatSelectModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
