import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  //Bu kod app-routing'de belirttiğimiz componentleri görebilmesi için login olması gerekliliği getiriyor
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.localStorageService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
      this.toastrService.error('Sisteme giriş yapmalısınız');
      return false;
    }
  }
}
