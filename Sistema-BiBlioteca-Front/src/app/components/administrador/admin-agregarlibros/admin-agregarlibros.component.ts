import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LibroFacadeService } from 'src/app/services/libro-facade.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-agregarlibros',
  templateUrl: './admin-agregarlibros.component.html',
  styleUrls: ['./admin-agregarlibros.component.css']
})
export class AdminAgregarlibrosComponent {

  form: FormGroup;
  mensaje: string = '';
  generos: string[] = ['Terror', 'Ciencia Ficción', 'Romance', 'Fantasía', 'Misterio'];
  

  constructor(private fb: FormBuilder, private libroFacade: LibroFacadeService) {
    this.form = this.fb.group({
      titulo_libro: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', [Validators.required, Validators.minLength(3)]],
      fecha_publicacion: ['', [Validators.required, this.fechaNoFutura]],
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

    this.libroFacade.agregarLibro(nuevoLibro).subscribe(
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

  fechaNoFutura(control: AbstractControl): ValidationErrors | null {
    const fecha = new Date(control.value);
    const fechaActual = new Date();
    if (fecha.getTime() > fechaActual.getTime()) {
      return { fechaNoFutura: true };
    }
    return null;
  }
}