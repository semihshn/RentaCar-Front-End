import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  carImages: CarImage[];
  Image:string;

  carUpdateForm: FormGroup;

  imageBasePath = 'https://localhost:44371';

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router,
    private imageService:CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getById(params['carId']);
        this.getImagesByCarId(params["carId"]);
        this.createCarUpdateForm();
      }
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getById(carId: number) {
    this.carService.getById(carId).subscribe((response) => {
      this.car = response.data;
      //console.log(this.car)
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      console.log(this.Image)
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe((response)=>{
        this.toastrService.success("Araç güncellendi")
        this.router.navigate(["admin/car-info"])
      },(responseError)=>{""
        let errorMessage = ErrorHelper.getMessage(responseError);
        this.toastrService.error(errorMessage, 'HATA');
      })
    }
  }

  getClass(image:CarImage){
    if (this.carImages[0]==image) {
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
  }

  getImagesByCarId(carId:number){
    this.imageService.getImageByCarId(carId).subscribe((response)=>{
      this.carImages=response.data;      
    });
  }

  //addImage çalışmıyor
  addImage(){
    // let today = new Date(Date.now())
    // let carImage:CarImage={
    //   imagePath:this.Image,
    //   carId:this.car.id,
    //   date:today.toISOString()
    // }
    // this.imageService.add(carImage).subscribe((response)=>{
    //   this.toastrService.success("Resim eklendi")
    // },(responseError)=>{
    //   let error=ErrorHelper.getMessage(responseError);
    //   this.toastrService.error(error);
    // })
  }

}
