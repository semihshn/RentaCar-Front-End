import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"Rentals/getallrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  
  getRentalByCar(carId:number):Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"Rentals/getrentalbycar?id="+carId
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add",rental)
  }
  
}
