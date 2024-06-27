import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registrar(usuario: any): Observable<any> {
    const url = `${environment.apiUrl}/auth/registrar`;
    return this.http.post(url, usuario);
  }

  login(usuario: any): Observable<any> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post(url, usuario).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  olvidoContrasena(data: any): Observable<any> {
    const url = `${environment.apiUrl}/auth/olvido-contrasena`;
    return this.http.post(url, data);
  }
  
}
