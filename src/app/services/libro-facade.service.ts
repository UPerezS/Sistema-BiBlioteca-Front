import { Injectable } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroFacadeService {

  constructor(private librosService: LibrosService) { }

  agregarLibro(libro: any): Observable<any> {
    return this.librosService.insertarLibro(libro);
  }

}
