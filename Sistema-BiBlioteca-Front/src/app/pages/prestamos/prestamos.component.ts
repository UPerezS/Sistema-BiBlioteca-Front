import { Component } from '@angular/core';
import { PrestamosService } from 'src/app/services/prestamos.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {

  prestamos: any;
  idUsuario: 0;
  constructor(private prestamosService: PrestamosService) { }

  ngOnInit(): void {
    this.prestamosService.getHistorialPrestamos().subscribe((response) => {
      this.prestamos = response;
    });
  }


}
