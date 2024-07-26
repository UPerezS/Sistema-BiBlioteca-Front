import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private apiUrl = 'http://localhost:3500/api/libros';
  private librosSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getLibros(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  insertarLibro(libro: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, libro, { headers });
  }

  actualizarLibro(id: number, libro: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, libro, { headers }).pipe(
      tap(() => this.librosSubject.next())
    );
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.librosSubject.next())
    );
  }

  librosChanged(): Observable<any> {
    return this.librosSubject.asObservable();
  }

  filtrarLibros(titulo: string, autor: string, genero: string): Observable<any> {
    let params = new HttpParams();
    if (titulo) {
      params = params.append('titulo', titulo);
    }
    if (autor) {
      params = params.append('autor', autor);
    }
    if (genero) {
      params = params.append('genero', genero);
    }
  
    return this.http.get(`${this.apiUrl}/filtrar`, { params });
  }

}

  /*
  actualizarLibro(id: number, libro: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${id}`, libro, { headers });
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }*/

