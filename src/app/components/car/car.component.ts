import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar:Car;
  carImage:CarImage[]=[];
  basePath=environment.baseUrl;
  carImageDefault="../../defaultImage/default.jpg"

  constructor(
    private carService: CarService,
    private carImageService:CarImageService,
    private activatedRout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRout.params.subscribe((params)=>{
      if (params["brandId"]) {
        this.getCarByBrand(params["brandId"])
      } else if(params["colorId"]){
        this.getCarByColor(params["colorId"])
      }else if(params["carId"]){
        this.getCarByCar(params["carId"])
      }else{
        this.getAllCarDetails();
      }
    })
  }

  getAllCarDetails() {
    this.carService.getAllCarDetails().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarByBrand(brandId: number) {
    this.carService.getCarByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarByColor(colorId: number) {
    this.carService.getCarByColor(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarByCar(carId: number) {
    this.carService.getCarByCar(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
  }

  // getImageByCarId() {
    
  //   this.carImageService.getImageByCarId(11).subscribe((response) => {
  //     return response.data;
  //     console.log(response.data);
  //   });
  // }
}
