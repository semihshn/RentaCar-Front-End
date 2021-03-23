import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[];
  carImages: CarImage[];
  currentImage: CarImage;
  dataLoaded = false;
  imageBasePath = 'https://localhost:44371';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
      }
      this.getImagesByCarId();
    });
  }

  getCarDetail(carId:number) {
    this.carService.getCarByCar(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getImagesByCarId(){
    this.imageService.getImageByCarId(this.activatedRoute.snapshot.params["carId"]).subscribe((response)=>{
      this.carImages=response.data;      
      console.log(this.carImages)
    });
  }

  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }

}
