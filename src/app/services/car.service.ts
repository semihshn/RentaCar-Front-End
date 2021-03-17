import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getCarByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getcarbybrand?id="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getcarbycolor?id="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getAllCarDetails():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getallcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCar(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getcarbycar?carId="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
