import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }
  
  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe((response)=>{
        this.toastrService.success("Marka Eklendi")
        this.router.navigate(["admin/brand-info"])
      },(responseError)=>{
        let errorMessage = ErrorHelper.getMessage(responseError);
        this.toastrService.error(errorMessage, 'HATA');
      })
    }
  }

}
