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
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let carModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(carModel).subscribe((response)=>{
        this.toastrService.success("Renk Eklendi")
        this.router.navigate(["admin/color-info"])
      },(responseError)=>{
        let errorMessage = ErrorHelper.getMessage(responseError);
        this.toastrService.error(errorMessage, 'HATA');
      })
    }
  }
}
