import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  carDetail: CarDetail;
  carImages: CarImage[];
  imageBasePath = 'https://localhost:44371';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
        this.getCarDetail(params["carId"]);
        this.getImagesByCarId(params["carId"]);


    });
  }

  getCarDetail(carId:number) {
    this.carService.getCarByCar(carId).subscribe((response) => {
      this.carDetail = response.data;
      console.log(this.carDetail)
    });
  }

  getImagesByCarId(carId:number){
    this.imageService.getImageByCarId(carId).subscribe((response)=>{
      this.carImages=response.data;      
    });
  }

  getClass(image:CarImage){
    if (this.carImages[0]==image) {
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
  }

}
