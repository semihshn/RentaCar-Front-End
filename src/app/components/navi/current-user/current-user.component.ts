import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css'],
})
export class CurrentUserComponent implements OnInit {
  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsername();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
    this.toastrService.info('Çıkış yapıldı');
  }

  getUsername(){
    this.userName = this.authService.getUserName();
  }
}
