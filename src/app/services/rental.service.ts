import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"Rentals/getrentaldetailsdto"
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }
}
