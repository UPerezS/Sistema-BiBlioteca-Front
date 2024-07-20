import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private apiUrl = 'http://3.20.43.248:3500/auth';  // URL del backend
  private apiUrl = 'http://localhost:3500/auth';  // URL del backend

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, user)
      .pipe(
        tap(response => {
          console.log('Usuario registrado:', response);
        })
      );
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);  // Guarda el token en el almacenamiento local
          }
          console.log('Usuario logueado:', response);
        })
      );
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');  // Elimina el token del almacenamiento local
    console.log('Usuario deslogueado');
  }
  
}
