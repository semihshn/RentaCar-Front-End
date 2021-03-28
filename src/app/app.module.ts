import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { ToastrModule } from 'ngx-toastr';
import { FiltercarPipe } from './pipes/filtercar.pipe';
import { FiltercolorPipe } from './pipes/filtercolor.pipe';
import { FilterbrandPipe } from './pipes/filterbrand.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { CreditCardComponent } from './components/credit-card/credit-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorInfoComponent } from './components/color-info/color-info.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandInfoComponent } from './components/brand-info/brand-info.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { CurrentUserComponent } from './components/navi/current-user/current-user.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    FiltercarPipe,
    FiltercolorPipe,
    FilterbrandPipe,
    FilterComponent,
    CreditCardComponent,
    FooterComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarInfoComponent,
    CarUpdateComponent,
    ColorInfoComponent,
    ColorUpdateComponent,
    BrandInfoComponent,
    BrandUpdateComponent,
    LoginComponent,
    PaymentComponent,
    HomeComponent,
    RegisterComponent,
    CurrentUserComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}//AuthInterceptor'ın tüm http isteklerinde çalışması için buraya ekleme yaptık , yani aspect yöntemi kullandık , bu yöntemi kullanmasak her post işleminin içine aynı kodu yazmak zorunda kalırdık , yetkilendirme işlemi çalışması için
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
