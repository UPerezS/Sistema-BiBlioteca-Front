import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth.guard';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserHomeComponent } from './components/usuario/user-home/user-home.component';
import { AdminHomeComponent } from './components/administrador/admin-home/admin-home.component';
import { ListaLibrosComponent } from './pages/lista-libros/lista-libros.component';
import { AdminAgregarlibrosComponent } from './components/administrador/admin-agregarlibros/admin-agregarlibros.component';
import { UserVerlibrosComponent } from './components/usuario/user-verlibros/user-verlibros.component';

const routes: Routes = [
  //Ruras Globales
  { path: 'inicio', component: InicioComponent, data: { requiresAuth: false } },
  { path: 'login', component: LoginComponent, data: { requiresAuth: false } },
  { path: 'registro', component: RegisterComponent, data: { requiresAuth: false } },
  //Rutas de Usuario Normal "id = 0"
  { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard], data: { expectedRole: 0, requiresAuth: true } },
  { path: 'user-vista', component: UserVerlibrosComponent, canActivate: [AuthGuard], data: { expectedRole: 0, requiresAuth: true } },
  //Rutas de Usuario Administrador "id = 1"
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard], data: { expectedRole: 1, requiresAuth: true } },
  { path: 'admin-agregar', component: AdminAgregarlibrosComponent, canActivate: [AuthGuard], data: { expectedRole: 1, requiresAuth: true } },
  { path: 'lista-libros', component: ListaLibrosComponent, data: { requiresAuth: false } },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
