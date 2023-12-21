import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const token = localStorage.getItem('userSecret')


export const userLogin: CanActivateFn = (route, state) => {
  const router = Inject(Router)
  if(token){
    router.navigate([''])
    return false
  }
  return true;
};
