import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"CarImages/getbycar?id="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getAllImage():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"CarImages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(image:CarImage){
    return this.httpClient.post<ResponseModel>(this.apiUrl+"carimages/add",image)
  }

}
