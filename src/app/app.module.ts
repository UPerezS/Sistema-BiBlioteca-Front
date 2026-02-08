import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminHomeComponent } from './components/administrador/admin-home/admin-home.component';
import { UserHomeComponent } from './components/usuario/user-home/user-home.component';
import { ListaLibrosComponent } from './pages/lista-libros/lista-libros.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AdminAgregarlibrosComponent } from './components/administrador/admin-agregarlibros/admin-agregarlibros.component';
import { UserVerlibrosComponent } from './components/usuario/user-verlibros/user-verlibros.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { PrestamosHistorialComponent } from './components/usuario/prestamos-historial/prestamos-historial.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    UserHomeComponent,
    ListaLibrosComponent,
    HeaderComponent,
    FooterComponent,
    AdminAgregarlibrosComponent,
    UserVerlibrosComponent,
    PrestamosComponent,
    PrestamosHistorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
