import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe((response)=>{
        this.toastrService.success("Araç eklendi")
        this.router.navigate(["admin/car-info"])
      },(responseError)=>{
        console.log(responseError)
        let errorMessage = ErrorHelper.getMessage(responseError);
        this.toastrService.error(errorMessage, 'HATA');
      })
    }
  }
  // rentACar(car:CarDetail) {
  //   let rentalInstance:Rental={
  //     rentDate:this.rentDate,
  //     returnDate:this.returnDate,
  //     carId:car.carId,
  //     customerId:this.customerId
  //   }
  //   this.rentalService.add(rentalInstance).subscribe((response)=>{
  //     this.toastrService.success("Araç kiralandı")
  //   },(responseError)=>{
  //     let errorMessage = ErrorHelper.getMessage(responseError);
  //     this.toastrService.error(errorMessage, 'HATA');
  //   })
  // }
}
