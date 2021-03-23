import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

creditCards:CreditCard[]=[];

  constructor(private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.getCreditCards()
  }

  getCreditCards() {
    this.creditCardService.getCreditCards().subscribe((response) => {
      this.creditCards = response.data;
    });
  }

}
