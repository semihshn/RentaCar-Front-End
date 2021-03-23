import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44371/api/"

  constructor(private httpClient:HttpClient) { }

  getCreditCards():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"CreditCards/getall"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  pay(creditCard:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"CreditCards/pay",creditCard)
  }

}
