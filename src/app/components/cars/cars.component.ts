import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Car } from 'src/app/models/Car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  title = 'frontend';
  @Input() minYop: string = '';
  @Input() isMinYopEnabled: boolean = false;
  @Input() maxYop: string = '';
  @Input() isMaxYopEnabled: boolean = false;
  @Input() registration: string = '';
  @Input() isRegistrationEnabled: boolean = false;
  @Input() brand: string = '';
  @Input() isBrandEnabled: boolean = false;
  @Input() model: string = '';
  @Input() isModelEnabled: boolean = false;

  isLoading: boolean = true;
  isError: boolean = false;
  cars: Car[] = [];

  constructor(
    private _carsService: CarsService,
    private _route: ActivatedRoute
  ) {}

  onFilterClick(){
    this.reload();
  }

  ngOnInit(): void {
    this.reload();
    this._route.queryParams.subscribe((params) => {
      const carId = params['deletedCarId'];
      this.cars = this.cars.filter(it => it.id !== carId)
    });
  }

  reload(){
    this._carsService.getFiltered(
      this.isRegistrationEnabled ? this.registration : undefined,
      this.isMinYopEnabled? Number(this.minYop) : undefined,
      this.isMaxYopEnabled? Number(this.maxYop) : undefined,
      this.isBrandEnabled ? this.brand : undefined,
      this.isModelEnabled ? this.model : undefined
    ).pipe(
    catchError(err => {
      this.isLoading = false;
      this.isError = true;
      return throwError(() => err);
    }))
    .subscribe(cars =>{
      this.cars = cars;
      this.isLoading = false;
      this.isError = false;
    })
  }
}
