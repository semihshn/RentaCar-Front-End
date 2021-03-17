import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+"Customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)
  }
}
