import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isAuthenticated:boolean;

  constructor(
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.authenticatedControl()
    //console.log(this.isAuthenticated)
  }

  authenticatedControl(){
    this.isAuthenticated = this.localStorageService.isAuthenticated()
  }


}
