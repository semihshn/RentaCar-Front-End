import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-info',
  templateUrl: './brand-info.component.html',
  styleUrls: ['./brand-info.component.css'],
})
export class BrandInfoComponent implements OnInit {
  brands: Brand[];

  constructor(
    private brandService: BrandService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  goToUpdateForm(brand: Brand) {
    this.router.navigate(['admin/brand-update/' + brand.id]);
  }

  goToAddForm() {
    this.router.navigate(['admin/brand-add']);
  }

  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe((response) => {
      this.toastrService.success("Marka silindi");
      this.getBrand();
    },(responseError)=>{
      let errorMessage=ErrorHelper.getMessage(responseError);
      this.toastrService.error(errorMessage,"HATA")
    });
  }
}
