import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { Car } from 'src/app/models/Car';
import { CarsService } from 'src/app/services/cars.service';
import { ListModifiedService } from 'src/app/services/list-modified.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy{
  @Input() minYop: string = '';
  @Input() isMinYopEnabled: boolean = false;
  @Input() maxYop: string = '';
  @Input() isMaxYopEnabled: boolean = false;
  @Input() plates: string = '';
  @Input() isPlatesEnabled: boolean = false;
  @Input() brand: string = '';
  @Input() isBrandEnabled: boolean = false;
  @Input() model: string = '';
  @Input() isModelEnabled: boolean = false;

  isLoading: boolean = true;
  isError: boolean = false;

  get cars(): Car[] {
    return this._listModifiedService.cars;
  }  

  set cars(cars: Car[]) {
    this._listModifiedService.cars = cars;
  }

  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _carsService: CarsService,
    private _router: Router,
    private _listModifiedService: ListModifiedService
  ) {}

  onFilterClick(){
    this.reload();
  }

  ngOnInit(): void {
    //this.cars = this._listModifiedService.cars;
    this.reload();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe()
  }

  reload(){
    this._carsService.getFiltered(
      this.isPlatesEnabled? this.plates : undefined,
      this.isMinYopEnabled? Number(this.minYop) : undefined,
      this.isMaxYopEnabled? Number(this.maxYop) : undefined,
      this.isBrandEnabled? this.brand : undefined,
      this.isModelEnabled? this.model : undefined
    ).pipe(
    catchError(err => {
      this.isLoading = false;
      this.isError = true;
      return throwError(() => err);
    }))
    .subscribe(cars =>{
      //this._listModifiedService.cars = cars;
      this.cars = cars;
      this.isLoading = false;
      this.isError = false;
    })
  }

  addCar(){
    this._router.navigateByUrl('cars/new');
  }
}
