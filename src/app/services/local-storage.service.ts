import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  Get(){
    return localStorage.getItem("token");
  }

  Set(setItem:string){
    localStorage.setItem("token",setItem);
  }

  Clear(){
    localStorage.clear();
  }

  isAuthenticated(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }

}
