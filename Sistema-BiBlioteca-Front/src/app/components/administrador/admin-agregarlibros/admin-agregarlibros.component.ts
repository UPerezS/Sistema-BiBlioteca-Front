import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-agregarlibros',
  templateUrl: './admin-agregarlibros.component.html',
  styleUrl: './admin-agregarlibros.component.css'
})
export class AdminAgregarlibrosComponent {

  form: FormGroup;
  mensaje: string = '';

  constructor(private fb: FormBuilder, private librosService: LibrosService) {
    this.form = this.fb.group({
      titulo_libro: ['', Validators.required],
      autor: ['', Validators.required],
      fecha_publicacion: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  agregarLibro(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    const nuevoLibro = {
      ...this.form.value,
      imagen: 'Sin Imagen Agregada',
      estatus_prestamo: false,
      estatus: true
    };

    this.librosService.insertarLibro(nuevoLibro).subscribe(
      response => {
        console.log(response);
        this.form.reset();
        Swal.fire({
          title: '¡Libro Registrado!',
          text: 'Libro registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error => {
        console.error('Error al agregar el libro:', error);
        Swal.fire({
          title: 'Error al Agregar el Libro',
          text: 'Ha ocurrido un error :( .',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }

}
