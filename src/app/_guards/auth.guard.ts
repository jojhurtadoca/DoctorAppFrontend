import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { SharedService } from '../shared/shared.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

  const sharedService = inject(SharedService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  let token = cookieService.get('Authorization');

  const user = sharedService.getSession();
  
  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken = jwtDecode(token);
    const expDate = (decodedToken.exp || 0) * 1000;
    const currentDate = new Date().getTime();
    if (expDate < currentDate) {
      router.navigate(['login']);
      return false;
    }
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
