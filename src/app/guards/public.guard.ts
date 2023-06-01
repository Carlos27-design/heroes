import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { map, tap } from 'rxjs';

export const publicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.checkOutAuthentication().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        _router.navigate(['./']);
      }
    }),
    map((isAuthenticated) => !isAuthenticated)
  );
};
