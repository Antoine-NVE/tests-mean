import { CanActivateFn } from '@angular/router';

export const connectedGuard: CanActivateFn = (route, state) => {
    return true;
};
