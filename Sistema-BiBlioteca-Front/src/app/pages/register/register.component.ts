import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,  private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z ]*$/)]],
      apellido_pa: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z ]*$/)]],
      apellido_ma: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z ]*$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/)
      ]],
      direccion: ['', [Validators.required, Validators.maxLength(20)]],
      telefono: ['', [Validators.required, Validators.maxLength(9), Validators.pattern(/^\d{9}$/)]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor revisa los campos marcados en rojo o completa el formulario.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const user = this.registerForm.value;
    user.rol = 0;
    user.estatus = 1;

    this.userService.register(user).subscribe(
      response => {
        console.log('Registration successful', response);
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Usuario registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/login']);
        });
        this.registerForm.reset();
      },
      error => {
        console.error('Registration failed', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar el usuario. Por favor intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}
  
  
  
/*import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

}
*/
  

