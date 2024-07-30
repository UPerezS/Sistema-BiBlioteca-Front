import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-user-verlibros',
  templateUrl: './user-verlibros.component.html',
  styleUrls: ['./user-verlibros.component.css']
})
export class UserVerlibrosComponent implements OnInit {
  libros: any[] = [];
  filtroForm: FormGroup;
  usuario: any;

  constructor(private librosService: LibrosService, private fb: FormBuilder,private authService: AuthService) {
    this.filtroForm = this.fb.group({
      titulo: [''],
      autor: [''],
      genero: ['']
    });
    this.usuario = this.authService.getIdUsuario();
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

  
  prestarLibro(idLibro: number): void {
    const idUsuario = this.authService.getIdUsuario();
    const confirmacion = confirm('¿Estás seguro de pedir prestado el libro? Este debe ser devuelto en un máximo de 7 días');
    if (confirmacion) {
      this.librosService.prestarLibro(idUsuario, idLibro).subscribe(
        (response) => {
          console.log('Préstamo registrado con éxito');
          window.location.reload(); // actualiza la página
        },
        (error) => {
          console.error('Error al registrar préstamo', error);
        }
      );
    }
  }
}