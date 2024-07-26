import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-user-verlibros',
  templateUrl: './user-verlibros.component.html',
  styleUrls: ['./user-verlibros.component.css']
})
export class UserVerlibrosComponent implements OnInit {
  libros: any[] = [];
  filtroForm: FormGroup;

  constructor(private librosService: LibrosService, private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      titulo: [''],
      autor: [''],
      genero: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerLibros();
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
}