import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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
  }
  
}
