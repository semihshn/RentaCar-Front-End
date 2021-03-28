import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getById(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getbyid?id="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getAllCar():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"Cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getcarbybrand?id="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getcarbycolor?id="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getAllCarDetails():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getallcardetails"
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarByCar(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"Cars/getcarbycarId?id="+carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarsBySelect(brandId:number, colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath =this.apiUrl + "Cars/getbyselected?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }
}
