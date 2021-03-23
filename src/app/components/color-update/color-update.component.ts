import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from 'src/app/helpers/errorHelper';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;

  colorUpdateForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getById(params['colorId']);
        this.createCarUpdateForm();
      }
    });
  }

  createCarUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  getById(colorId: number) {
    this.colorService.getById(colorId).subscribe((response) => {
      this.color = response.data;
      console.log(this.color)
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response)=>{
        this.toastrService.success("Renk güncellendi")
        this.router.navigate(["admin/brand-info"])
      },(responseError)=>{
        let errorMessage = ErrorHelper.getMessage(responseError);
        this.toastrService.error(errorMessage, 'HATA');
      })
    }
  }

}
