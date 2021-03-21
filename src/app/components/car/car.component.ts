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
  apiUrl="https://localhost:44371"
  carImageDefault="../../defaultImage/default.jpg"
  dataLoaded = false;
  filterText="";

  constructor(
    private carService: CarService,
    private carImageService:CarImageService,
    private activatedRout: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.activatedRout.params.subscribe((params)=>{
      if(params["colorId"]){
        this.getCarByColor(params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarByBrand(params["brandId"]);
      }
      else if(params["colorId"] && params["brandId"]){
        this.getCarsBySelect(params["brandId"],params["colorId"]);
      }
      else {
        this.getAllCarDetails();
      }
    })
  }

  getCarsBySelect(brandId:number, colorId:number){
    this.carService.getCarsBySelect(brandId,colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }

  getAllCarDetails() {
    this.carService.getAllCarDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarByBrand(brandId: number) {
    this.carService.getCarByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarByColor(colorId: number) {
    this.carService.getCarByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  getCarByCar(carId: number) {
    this.carService.getCarByCar(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded=true;
    });
  }

  setCurrentCar(car: Car) {
    this.currentCar = car;
    
    this.dataLoaded=true;
  }
}
