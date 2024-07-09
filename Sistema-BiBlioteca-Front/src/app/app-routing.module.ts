import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './components/auth.guard';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './components/usuario/user-home/user-home.component';
import { AdminHomeComponent } from './components/administrador/admin-home/admin-home.component';
import { ListaLibrosComponent } from './pages/lista-libros/lista-libros.component';

const routes: Routes = [
  //Ruras Globales
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, data: { requiresAuth: false } },
  { path: 'login', component: LoginComponent, data: { requiresAuth: false } },
  { path: 'registrar', component: RegisterComponent, data: { requiresAuth: false } },
  //Rutas de Usuario Normal "id = 0"
  { path: 'user-home', component: UserHomeComponent, canActivate: [authGuard], data: { expectedRole: 0, requiresAuth: true } },
  //Rutas de Usuario Administrador "id = 1"
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [authGuard], data: { expectedRole: 0, requiresAuth: true } },
  { path: 'lista-libros', component: ListaLibrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
