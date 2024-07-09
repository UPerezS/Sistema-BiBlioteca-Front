import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) { }

  login() {
    const credentials = {
      correo: this.email,
      contrasena: this.password
    };

    this.userService.login(credentials).subscribe(
      response => {
        console.log('Login successful', response);
        // Redirigir al usuario a otra página si es necesario
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
