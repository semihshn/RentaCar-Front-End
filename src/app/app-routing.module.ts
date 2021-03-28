import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandInfoComponent } from './components/brand-info/brand-info.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorInfoComponent } from './components/color-info/color-info.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"cars",component:CarComponent,canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/:carId",component:CarComponent},
  {path:"rentals/:carId", component:RentalComponent},
  {path:"car/details/:carId", component:CarDetailComponent},
  {path:"admin/color-add", component:ColorAddComponent},
  {path:"admin/color-info", component:ColorInfoComponent},
  {path:"admin/color-update/:colorId", component:ColorUpdateComponent},
  {path:"admin/brand-add", component:BrandAddComponent},
  {path:"admin/brand-info", component:BrandInfoComponent},
  {path:"admin/brand-update/:brandId", component:BrandUpdateComponent},
  {path:"admin/car-info", component:CarInfoComponent},
  {path:"admin/car-update/:carId", component:CarUpdateComponent},
  {path:"admin/car-add", component:CarAddComponent},
  {path:"pay/:customerId", component:PaymentComponent},
  {path:"user", component:UserComponent},
  

  
  
  // {path:"pay/car/:carId/rent/:rentalId", component:CreditCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
