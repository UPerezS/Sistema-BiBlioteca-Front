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
};