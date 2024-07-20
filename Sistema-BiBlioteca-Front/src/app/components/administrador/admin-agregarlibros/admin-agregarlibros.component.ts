import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';

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
      genero: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  agregarLibro(): void {
    if (this.form.invalid) {
      this.mensaje = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    const nuevoLibro = {
      ...this.form.value,
      estatus_prestamo: false,
      estatus: true
    };

    this.librosService.insertarLibro(nuevoLibro).subscribe(
      response => {
        this.mensaje = response.message;
        this.form.reset();
      },
      error => {
        console.error('Error al agregar el libro:', error);
        this.mensaje = 'Error al agregar el libro. Inténtelo de nuevo.';
      }
    );
  }

}
