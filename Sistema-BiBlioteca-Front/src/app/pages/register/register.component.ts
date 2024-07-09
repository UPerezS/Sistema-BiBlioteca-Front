import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  nombre: string = '';
  apellido_pa: string = '';
  apellido_ma: string = '';
  correo: string = '';
  contrasena: string = '';
  direccion: string = '';
  telefono: string = '';
  rol: 0;
  estatus: 1;

  constructor(private userService: UserService) { }

  register() {
    const user = {
      nombre: this.nombre,
      apellido_pa: this.apellido_pa,
      apellido_ma: this.apellido_ma,
      correo: this.correo,
      contrasena: this.contrasena,
      direccion: this.direccion,
      telefono: this.telefono,
      rol: 0,
      estatus: 1
    };

    this.userService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        // Redirigir al usuario a otra página si es necesario
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
  /*
  registerForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_pa: ['', Validators.required],
      apellido_ma: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: [0], // Default role as boolean
      estatus: [true] // Default status as boolean
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
        },
        error => {
          console.error('Registration error:', error);
        }
      );
    }
  }*/
  
}
