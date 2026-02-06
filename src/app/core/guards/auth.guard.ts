import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const ok = localStorage.getItem('loggedIn') === 'true';
  if (ok) return true;

  router.navigateByUrl('/login');
  return false;
};
