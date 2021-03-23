import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorInfoComponent } from './color-info.component';

describe('ColorInfoComponent', () => {
  let component: ColorInfoComponent;
  let fixture: ComponentFixture<ColorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
