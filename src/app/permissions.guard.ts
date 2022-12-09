import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Alert } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.hasUser()){    
    return true;
  }
  //aca se puede redirigir a UN LUGAR 
  alert('no hay permiso compita');
  return false;
  }

hasUser(): boolean  { 
  return false;
}
}
