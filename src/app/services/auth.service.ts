import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ErrorHelper } from '../helpers/errorHelper';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient,private router:Router,private toastrService:ToastrService) {}

  path = 'https://localhost:44371/api/'
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService =new JwtHelperService();
  TOKEN_KEY="token";

  login(loginUser: LoginModel) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.loginforToken(loginUser).subscribe(data => {

      this.saveToken(data.body.data.token);
      this.userToken = data.body.token;
      this.decodedToken = this.jwtHelper.decodeToken(data.body.data.token);
      this.router.navigateByUrl("/cars");

      this.toastrService.success("Giriş başarılı")

      // console.log(this.decodedToken)
      // console.log(this.getUserRoles());
      // console.log(this.getUserName());
      // console.log(this.getUserId());
    },(responseError)=>{
      let errorMessage=ErrorHelper.getMessage(responseError);
      this.toastrService.error(errorMessage)
    });
    
  }

  register(registerUser: RegisterModel) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.registerforToken(registerUser).subscribe(data => {

      this.saveToken(data.body.data.token);
      this.userToken = data.body.token;
      this.decodedToken = this.jwtHelper.decodeToken(data.body.data.token);
      this.router.navigateByUrl("/cars");

      this.toastrService.success("Kayıt başarılı")

      // console.log(this.decodedToken)
      // console.log(this.getUserRoles());
      // console.log(this.getUserName());
      // console.log(this.getUserId());
    },(responseError)=>{
      let errorMessage=ErrorHelper.getMessage(responseError);
      this.toastrService.error(errorMessage)
    });
    
  }

 

  loginforToken(loginUser: LoginModel): Observable<any> {
    return this.httpClient.post(this.path + 'auth/login', loginUser, { observe: 'response' });
  }

  registerforToken(registerModel: RegisterModel):Observable<any> {
    return this.httpClient.post(this.path + 'auth/register',registerModel,{observe:'response'});
  }

  saveToken(token:any) {
    
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut(){
   
    localStorage.removeItem(this.TOKEN_KEY)
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  loggedIn(){
    return this.jwtHelper.isTokenExpired(this.getToken()?.toString())
  }

  getUserRoles(){
    if(this.getToken() != null){
      if (!('http://schemas.microsoft.com/ws/2008/06/identity/claims/role' in this.jwtHelper.decodeToken(this.getToken()?.toString()))){
        return "User";
      }
      return this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }else {
      return "User";
    }
  }

  getUserName(){
    return this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  getUserId(){
    return this.jwtHelper.decodeToken(this.getToken()?.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }
}
