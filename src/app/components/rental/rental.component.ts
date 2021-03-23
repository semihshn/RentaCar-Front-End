import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  customers:Customer[]=[];
  carDetails:CarDetail[];
  // rental!: RentalDetail[];
  
  customerId:number;
  returnDate!: Date;
  rentDate!: Date;

  imageBasePath = 'https://localhost:44371';

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router:Router,
    private customerService:CustomerService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCustomer();
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarByCar(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  rentACar(car:CarDetail) {
    let rentalInstance:Rental={
      rentDate:this.rentDate,
      returnDate:this.returnDate,
      carId:car.carId,
      customerId:this.customerId
    }
    this.rentalService.add(rentalInstance).subscribe((response)=>{
      this.toastrService.success("Araç kiralandı")
    },(responseError)=>{
      let errorMessage = ErrorHelper.getMessage(responseError);
      this.toastrService.error(errorMessage, 'HATA');
    })
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe((response)=>{
      this.customers=response.data;
    })
  }

  customerSelectChangeHandler (event: any) {
    this.customerId = parseInt(event.target.value);
  }

  // goToPay(car:Car){
  //   this.rentalService.getRentalByCar(car.carId).subscribe((response)=>{
  //     this.rental=response.data
  //   })
  //   return "/pay/car/"+car.carId+"/rent/"+
  // }
}
