import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsStringFilterComponent } from './cars-string-filter.component';

describe('CarsStringFilterComponent', () => {
  let component: CarsStringFilterComponent;
  let fixture: ComponentFixture<CarsStringFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarsStringFilterComponent]
    });
    fixture = TestBed.createComponent(CarsStringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
