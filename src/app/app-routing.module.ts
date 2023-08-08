import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { BoardComponent } from "./components/board/board.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { FavoriteComponent } from "./components/favorite/favorite.component";
import { SharedComponent } from "./components/shared/shared.component";
import { CollectionComponent } from "./components/collection/collection.component";
import { CollectionBoardsComponent } from "./components/collection-boards/collection-boards.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "", redirectTo: "/login", pathMatch: "full" },
	{ path: "home", component: HomeComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "board/:id", component: BoardComponent },
	{ path: "forgot", component: ForgotPasswordComponent },
	{ path: "reset", component: ResetPasswordComponent },
	{ path: "favorite", component: FavoriteComponent },
	{ path: "shared", component: SharedComponent },
	{ path: "collection", component: CollectionComponent },
	{ path: "collection/:id", component: CollectionBoardsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
