import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



export const userLogin: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userSecret')
  const router = inject(Router)
  if(token){
    router.navigate(['/'])
    return false
  }
  return true;
};



export const userlogoutGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('userSecret');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};