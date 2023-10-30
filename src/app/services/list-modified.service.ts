import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class ListModifiedService {

  constructor() { }

  private _carDeletedSubject = new Subject<number>()
  private _carModifiedSubject = new Subject<Car>();
  private _carAddedSubject = new Subject<Car>();

  notifyCarDeleted(id: number){
    this._carDeletedSubject.next(id);
  }

  notifyCarModified(car: Car){
    this._carModifiedSubject.next(car);
  }

  notifyCarAdded(car: Car){
    this._carAddedSubject.next(car);
  }

  carDeletedSubscription(callback: (id: number) => void) : Subscription {
    return this._carDeletedSubject.subscribe(callback)
  }

  carModifiedSubscription(callback: (car: Car) => void) : Subscription {
    return this._carModifiedSubject.subscribe(callback);
  }

  carAddedSubscription(callback: (car: Car) => void) : Subscription {
    return this._carAddedSubject.subscribe(callback);
  }
}
