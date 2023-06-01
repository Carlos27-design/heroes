import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { tap } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.checkOutAuthentication().pipe(
    tap((isAuthenticated) => console.log('authtenticated ' + isAuthenticated)),
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        _router.navigate(['./auth/login']);
      }
    })
  );
};
