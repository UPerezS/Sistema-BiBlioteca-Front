import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent implements OnInit, OnDestroy {
  libros: any[] = [];
  libroSeleccionado: any = null;
  form: FormGroup;
  filtroForm: FormGroup;
  private librosSubscription: Subscription;

  constructor(private librosService: LibrosService, private fb: FormBuilder) {
    this.form = this.fb.group({
      autor: ['', Validators.required],
      genero: ['', Validators.required],
      estatus_prestamo: [false],
      estatus: [false]
    });

    this.filtroForm = this.fb.group({
      titulo: [''],
      autor: [''],
      genero: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerLibros();
    this.librosSubscription = this.librosService.librosChanged().subscribe(() => {
      this.obtenerLibros();
    });
  }

  ngOnDestroy(): void {
    this.librosSubscription.unsubscribe();
  }

  obtenerLibros(): void {
    this.librosService.getLibros().subscribe(
      (data) => {
        this.libros = data;
      },
      (error) => {
        console.error('Error al obtener los libros', error);
      }
    );
  }

  filtrarLibros(): void {
    const { titulo, autor, genero } = this.filtroForm.value;
    this.librosService.filtrarLibros(titulo, autor, genero).subscribe(
      (data) => {
        this.libros = data;
      },
      (error) => {
        console.error('Error al filtrar los libros', error);
      }
    );
  }

  selectLibro(libro: any): void {
    this.libroSeleccionado = libro;
    this.form.patchValue({
      autor: libro.autor,
      genero: libro.genero,
      estatus_prestamo: libro.estatus_prestamo,
      estatus: libro.estatus
    });
  }

  cancel(): void {
    this.libroSeleccionado = null;
    this.form.reset();
  }

  update(): void {
    if (this.form.valid && this.libroSeleccionado) {
      const libroActualizado = {
        ...this.libroSeleccionado,
        autor: this.form.value.autor,
        genero: this.form.value.genero,
        estatus_prestamo: this.form.value.estatus_prestamo,
        estatus: this.form.value.estatus,
        fecha_publicacion: this.form.value.fecha_publicacion
      };

      this.librosService.actualizarLibro(this.libroSeleccionado.id_libro, libroActualizado).subscribe(
        (response) => {
          console.log(response.message);
          this.obtenerLibros();
          this.cancel();
        },
        (error) => {
          console.error('Error al actualizar el libro', error);
        }
      );
    }
  }

  deleteLibro(index: number): void {
    const libro = this.libros[index];
  
    // Verificar si el libro está prestado
    if (libro.estatus_prestamo) {
      // Muestra un mensaje de advertencia
      window.alert('No se puede eliminar el libro porque está prestado.');
      return;
    }
  
    // Mostrar un cuadro de confirmación
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar este libro?');
  
    if (confirmar) {
      // Si el usuario confirma, proceder con la eliminación
      this.librosService.eliminarLibro(libro.id_libro).subscribe(
        (response) => {
          console.log(response.message);
          this.libros.splice(index, 1);
        },
        (error) => {
          console.error('Error al eliminar el libro', error);
        }
      );
    } else {
      // Si el usuario cancela, no se realiza ninguna acción
      console.log('Eliminación cancelada');
    }
  }
  
  

  

}