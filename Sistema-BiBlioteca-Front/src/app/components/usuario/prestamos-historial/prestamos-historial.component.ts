import { Component } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';

@Component({
  selector: 'app-prestamos-historial',
  templateUrl: './prestamos-historial.component.html',
  styleUrl: './prestamos-historial.component.css'
})
export class PrestamosHistorialComponent {

  prestamos: any;
  idUsuario: number;

  constructor(private prestamosService: PrestamosService) { }

  ngOnInit(): void {
    this.idUsuario = parseInt(localStorage.getItem('idUsuario')); // Obtiene el ID de usuario de la sesión
    if (!isNaN(this.idUsuario)) { // Verifica si el valor es un número válido
      this.obtenerHistorialPrestamos();
    } else {
      console.error('Error: El ID de usuario no es un número válido');
    }
  }

  obtenerHistorialPrestamos(): void {
    this.prestamosService.getHistorialPrestamosId(this.idUsuario).subscribe((response) => {
      this.prestamos = response;
    });
  }
  
}
