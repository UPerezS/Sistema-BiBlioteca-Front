import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const expectedRole = next.data['expectedRole'] as number; // Acceder correctamente usando ['expectedRole']
    const isLoggedIn = this.authService.isLoggedIn();
    const currentUserRole = this.authService.getUserRole();

    if (isLoggedIn && currentUserRole === expectedRole) {
      return true;
    } else {
      // No autenticado, redirigir a la página de inicio de sesión
      return this.router.createUrlTree(['/login']);
    }
  }
}
/*

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const currentUserRole = authService.getUserRole();

  if (authService.isLoggedIn() && currentUserRole === expectedRole) {
    return true;
  }

  authService.logout();
  return router.createUrlTree(['/login']);
};*/