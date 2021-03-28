import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payAddForm: FormGroup;

  isSaveCard:boolean;

  customer:Customer;
  card:CreditCard;
  cards:CreditCard[];

  constructor(
    private formBuilder:FormBuilder,
    private creditCardService:CreditCardService,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        // this.getCustomerCart(params['customerId']);
        this.getCustomerById(params["customerId"])
        this.getCreditCardsByCustomerId(params["customerId"]);
        this.createPayAddForm();
      }
    });
  }

  createPayAddForm() {
    this.payAddForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  getCustomerById(customerId:number){
    this.customerService.getCustomerById(customerId).subscribe((response)=>{
      this.customer=response.data;
    })
  }

  // getCustomerCart(customerId:number){
  //   this.creditCardService.getCreditCard(customerId).subscribe((response)=>{
  //   this.card=response.data;
  //   })
  // }

  getCreditCardsByCustomerId(customerId:number){
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response)=>{
    this.cards=response.data;
    this.card=response.data[0]
    })
  }

  checkIfCreditCard(customerId:number){
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response)=>{
      console.log(response)
      if (response==undefined) {
        return false
      } else {
        return true
      }
    })
  }

  pay(){
    let temp=this.checkIfCreditCard(this.card.customerId)
    console.log(temp)
    // if (this.payAddForm.valid) {
    //   if (this.isSaveCard) {
    //     this.toastrService.success("Kartınız kaydedilmeden ödeme işlemi gerçekleştirildi");
    //   } else if (temp==undefined) {
    //     let Card:CreditCard={
    //       customerId:this.card.customerId,
    //       cardNumber:this.card.cardNumber,
    //       expiration:this.card.expiration,
    //       cvc:this.card.cvc
    //     }
    //     this.card.customerId=this.customer.id
    //     this.creditCardService.pay(Card).subscribe((response)=>{
    //       this.toastrService.success("Ödeme işlemi gerçekleştirildi")
    //     },(responseError)=>{
    //       let error=ErrorHelper.getMessage(responseError);
    //       this.toastrService.error(error);
    //     })
    //   }else{
    //     this.toastrService.error("Kartınız zaten veritabanımızda kayıtlı o yüzden kaydedilmeden ödeme yapıldı")
    //   }
    // } else {
    //   this.toastrService.warning("Tüm alanları doldurunuz")
    // }
    //console.log(this.isSaveCard)
  }

  cardSelectChangeHandler(event:any){
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id==event.target.value) {
        this.card=this.cards[i]
      }
    }
  }

}
