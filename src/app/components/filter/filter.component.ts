import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];

  filterColorText:string;
  filterBrandText:string;

  selectedBrandId: number;
  selectedColorId: number;

  constructor(
    private colorService: ColorService,
    private barndService: BrandService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
  }

  brandSelectChangeHandler (event: any) {
    this.selectedBrandId = event.target.value;
  }

  colorSelectChangeHandler (event: any) {
    this.selectedColorId = event.target.value;
  }

  filterCar(){
    if(this.selectedBrandId==undefined&&this.selectedColorId==undefined){
      return "/cars"
    }else if(this.selectedColorId==undefined){
      return "/cars/brand/"+this.selectedBrandId
    }else if(this.selectedBrandId==undefined){
      return "cars/color/"+this.selectedColorId
    }else{
      return "cars/brand/"+this.selectedBrandId+"/color/"+this.selectedColorId;
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.barndService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}
