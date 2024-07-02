import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css']
})
export class ListaLibrosComponent {

  title = 'inline-table-editor';

  // Mock Libros Data
  libros: Libro[] = [
    {
      id_libro: 1,
      titulo_libro: "El nombre del viento",
      autor: "Patrick Rothfuss",
      fecha_publicacion: new Date('2007-03-27'),
      genero: "Fantasía",
      estatus_prestamo: false,
      estatus: true
    },
    {
      id_libro: 2,
      titulo_libro: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      fecha_publicacion: new Date('1967-05-30'),
      genero: "Realismo mágico",
      estatus_prestamo: false,
      estatus: true
    }
    // Aquí puedes agregar más libros según necesites
  ];

  libroSeleccionado: Libro = {} as Libro;
  isEditing: boolean = false;

  form = this.fb.group({
    titulo_libro: ['', [Validators.required]],
    autor: ['', [Validators.required]],
    fecha_publicacion: ['', [Validators.required]],
    genero: [''],
    estatus_prestamo: [false],
    estatus: [true]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  selectLibro(libro: Libro) {
    if (Object.keys(this.libroSeleccionado).length === 0) {
      this.libroSeleccionado = libro;
      this.isEditing = true;

      this.form.patchValue({
        titulo_libro: libro.titulo_libro,
        autor: libro.autor,
        fecha_publicacion: libro.fecha_publicacion,
        genero: libro.genero,
        estatus_prestamo: libro.estatus_prestamo,
        estatus: libro.estatus
      });
    }
  }

  deleteLibro(index: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.libros.splice(index, 1);
    }
  }

  update() {
    if (!this.isEditing) {
      this.libros.unshift({
        id_libro: this.generateId(),
        titulo_libro: this.form.value.titulo_libro!,
        autor: this.form.value.autor!,
        fecha_publicacion: this.form.value.fecha_publicacion!,
        genero: this.form.value.genero!,
        estatus_prestamo: this.form.value.estatus_prestamo!,
        estatus: this.form.value.estatus!
      });
    } else {
      let index = this.libros.findIndex(l => l.id_libro === this.libroSeleccionado.id_libro);

      this.libros[index] = {
        id_libro: this.libroSeleccionado.id_libro,
        titulo_libro: this.form.value.titulo_libro!,
        autor: this.form.value.autor!,
        fecha_publicacion: this.form.value.fecha_publicacion!,
        genero: this.form.value.genero!,
        estatus_prestamo: this.form.value.estatus_prestamo!,
        estatus: this.form.value.estatus!
      };
    }

    // Limpiar variables de edición
    this.libroSeleccionado = {} as Libro;
    this.isEditing = false;
    this.form.reset();
  }

  cancel() {
    if (!this.isEditing && confirm('Se eliminarán todos los cambios no guardados. ¿Estás seguro de cancelar?')) {
      this.libros.splice(0, 1); // Eliminar el primer elemento (sin datos) si no se está editando
    }

    // Limpiar variables de edición
    this.libroSeleccionado = {} as Libro;
    this.isEditing = false;
    this.form.reset();
  }

  addLibro() {
    this.libros.unshift({
      id_libro: -1, // Este valor se ignorará ya que se genera automáticamente en update()
      titulo_libro: '',
      autor: '',
      fecha_publicacion: '',
      genero: '',
      estatus_prestamo: false,
      estatus: true
    });

    this.libroSeleccionado = this.libros[0];
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  generateId() {
    // Generar un ID único, por ejemplo, utilizando un contador o un UUID
    return Math.floor(Math.random() * 1000) + 1; // Genera un número aleatorio entre 1 y 1000
  }

}

export interface Libro {
  id_libro: number;
  titulo_libro: string;
  autor: string;
  fecha_publicacion: any; // Puedes usar un tipo Date u otro tipo según lo necesites
  genero: string;
  estatus_prestamo: boolean;
  estatus: boolean;
}
