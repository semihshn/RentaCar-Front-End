import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authservice:AuthService,
    private router:Router,
    private localStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      age:["",Validators.required],
    });
  }

  register(){
    if (this.registerForm.valid) {
      //console.log(this.registerForm.value)
      let registerModel=Object.assign({},this.registerForm.value);
      this.authservice.register(registerModel)
    }
  }

}
