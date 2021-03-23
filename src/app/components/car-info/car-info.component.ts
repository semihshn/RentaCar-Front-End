import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  cars:Car[]=[];

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCar();
  }

  getCar(){
    this.carService.getAllCar().subscribe((response)=>{
      this.cars=response.data;
    })
  }

}
