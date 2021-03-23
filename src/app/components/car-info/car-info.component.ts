import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css'],
})
export class CarInfoComponent implements OnInit {
  cars: Car[] = [];

  constructor(
    private carService: CarService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCar();
  }

  getCar() {
    this.carService.getAllCar().subscribe((response) => {
      this.cars = response.data;
    });
  }

  goToUpdateForm(car: Car) {
    this.router.navigate(['admin/car-update/' + car.id]);
  }

  goToAddForm() {
    this.router.navigate(['admin/car-add']);
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe((response) => {
      this.toastrService.success("Araç silindi");
      this.getCar();
    },(responseError)=>{
      let errorMessage=ErrorHelper.getMessage(responseError);
      this.toastrService.error(errorMessage,"HATA");
    });
  }
}
