import {inject} from '@angular/core';
import {CanActivateFn,Router} from '@angular/router';
import { map } from 'rxjs/operators';
import {Auth} from '../services/auth';

export const authGuard: CanActivateFn = (route) => {
    const allowedRoles =
      route.data?.['roles'] as string[];
    const authService =inject(Auth);
    const router =inject(Router);
    if (authService.isLoggedIn()) {
      return true;
    }
    return authService
      .validateAuth()
      .pipe(
        map((isAuth: boolean) => {
          if (isAuth) {
            return true;
          }
          router.navigate([
            '/login'
          ]);
          return false;
        })
  );
  // role check
  const role = authService.getRole()
  if ( allowedRoles &&!allowedRoles.includes(role!)) {
    router.navigate(['/unauthorized']);
    return false;
  }
    return false;
  }
 

