import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { Car } from 'src/app/models/Car';
import { CarsService } from 'src/app/services/cars.service';
import { ListModifiedService } from 'src/app/services/list-modified.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  isError: boolean = false;


  registered: string = "";

  private _subscriptions: Subscription = new Subscription();

  private _modeNew: boolean = true;

  numbers: number[] = rangeHelper(1886, 2023)

  car: Car = {
    id: 0,
    plates: '',
    brand: '',
    model: '',
    yop: 1886,
  };

  constructor(
    private _carsService: CarsService,
    private _listModifiedService: ListModifiedService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(): void {
    const subscription = this._route.url.subscribe(urlSegment => {
      if(urlSegment[1]?.path === 'edit'){
        const editedCarId = Number(urlSegment[2]!)
        this._carsService
          .getById(editedCarId)
          .pipe(
            catchError(err => {
              this.isLoading = false;
              this.isError = true;
              return throwError(() => err);
            })
          )
          .subscribe(car => {
            this.car = { ...car }
            this.isLoading = false;
            this.isError = false;
            this._modeNew = false;
          }
        );
      } else {
        // create new case
        this.car = {
          id: 0,
          plates: '',
          brand: '',
          model: '',
          yop: 1886
        };
        this._modeNew = true;
        this.isLoading = false;
        this.isError = false;
      }
    })
    this._subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  submitForm(){
    if(this._modeNew){
      this._carsService.add(this.car).subscribe();
      this._listModifiedService.notifyCarAdded(this.car);
      this.back()
    } else {
      this._carsService.update(this.car).subscribe();
      this._listModifiedService.notifyCarModified(this.car);
      this.back();
    }
  }

  back(){
    this._router.navigate(['/cars']);
  }
}

function rangeHelper(start: number, end: number) {
  return Array.from({length: (end - start)}, (v, k) => k + start);
}
