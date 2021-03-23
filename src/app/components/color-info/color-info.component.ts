import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-info',
  templateUrl: './color-info.component.html',
  styleUrls: ['./color-info.component.css'],
})
export class ColorInfoComponent implements OnInit {
  colors: Color[];

  constructor(
    private colorService: ColorService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  goToUpdateForm(color: Color) {
    this.router.navigate(['admin/color-update/' + color.id]);
  }

  goToAddForm() {
    this.router.navigate(['admin/color-add']);
  }

  delete(color: Color) {
    this.colorService.delete(color).subscribe((response) => {
      this.toastrService.success("Renk silindi");
      this.getColor();
    },(responseError)=>{
      let errorMessage=ErrorHelper.getMessage(responseError);
      this.toastrService.error(errorMessage,"HATA")
    });
  }
}

