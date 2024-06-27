/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
*/
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private username: string = '';
  private userRole: number = 0;
  private idUsuario: number = 0;

  constructor(private router: Router, private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem('token');
    this.username = localStorage.getItem('username') || '';
    this.userRole = parseInt(localStorage.getItem('role') || '0', 10);
    this.idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10);
  }

  public verifyCapcha(verifyToken: any): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>('https://www.google.com/recaptcha/api/siteverify', verifyToken)
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setAuthentication(status: boolean, username: string, role: number, idUsuario: number): void {
    this.isAuthenticated = status;
    this.username = username;
    this.userRole = role;
    this.idUsuario = idUsuario;
  
    if (status) {
      localStorage.setItem('token', 'dummy_token');
      localStorage.setItem('username', username);
      localStorage.setItem('role', role.toString());
      localStorage.setItem('idUsuario', idUsuario.toString());
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('idUsuario');
    }
  }

  getUserRole(): number {
    return this.userRole;
  }

  getUsername(): string {
    return this.username;
  }

  getIdUsuario(): number {
    return this.idUsuario;
  }

  logout(): void {
    this.setAuthentication(false, '', 0, 0); // Llama al método setAuthentication para establecer el estado de autenticación como falso
    this.router.navigate(['/inicio']); // Redirige al usuario al componente de login
  }

  logoutF(): void {
    this.setAuthentication(false, '', 0, 0); // Llama al método setAuthentication para establecer el estado de autenticación como falso
  }

}
