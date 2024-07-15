import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  clearFields() {
    this.email = '';
    this.password = '';
  }

  login() {
    if (!this.email || !this.password) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const credentials = {
      correo: this.email,
      contrasena: this.password
    };

    this.userService.login(credentials).subscribe(
      response => {
        console.log('Login successful', response);
        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.authService.setAuthentication(
            true,
            response.usuario.nombre,
            response.usuario.rolUsuario,
            response.usuario.idUsuario,
            response.token
          );
          if (response.usuario.rolUsuario === 0) {
            this.router.navigate(['/user-home']);
          } else if (response.usuario.rolUsuario === 1) {
            this.router.navigate(['/admin-home']);
          }
        });
        this.clearFields();
      },
      error => {
        console.error('Login failed', error);
        Swal.fire({
          title: 'Error de inicio de sesión',
          text: 'Usuario no encontrado o contraseña incorrecta.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.clearFields();
      }
    );
  }

}
