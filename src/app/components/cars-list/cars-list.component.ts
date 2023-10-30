import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../../models/Car';
import { Router } from '@angular/router';
import { ListModifiedService } from 'src/app/services/list-modified.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})

export class CarsListComponent implements OnInit, OnDestroy{
  @Input() cars: Car[] = [];

  private _subscriptions = new Subscription();

  private _sortKey = "";
  private _sortDirection = "asc";

  constructor(
    private _router: Router,
    private _listModifiedService: ListModifiedService,
  ){}

  ngOnInit(): void {
    const carAddedSubscription = this._listModifiedService.carAddedSubscription((car) => {
      this.cars.push(car);
      this.sortTable(this._sortKey);
    });
    const carDeletedSubscription = this._listModifiedService.carDeletedSubscription((id) => {
      this.cars = this.cars.filter((it) => it.id !== id)
    })
    const carModifiedSubscription = this._listModifiedService.carModifiedSubscription((car) => {
      this.cars = this.cars.filter((it) => it.id !== car.id);
      this.cars.push(car);
      this.sortTable(this._sortKey);
    })

    this._subscriptions.add(carAddedSubscription);
    this._subscriptions.add(carDeletedSubscription);
    this._subscriptions.add(carModifiedSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  /* 
   * I decided to implement sorting on the user side,
   * and filtering on the server side, just to keep things interesting.
   * I'm aware both apporaches have their pros and cons and there is no
   * universally good way to delegate these task, this implementation
   * is just for a demo purposes, I'm not arguing here what approach would
   * be better in this case. This implementation of sorting is a bit over the top
   * but it generalizes nicely for more complex types.
   */

  private readonly _sortHelper = 
  {
    "Plate number": {
      "getter": (car: Car) => car.plates,
      "comparator": comparator
    },
    "Brand": {
      "getter": (car: Car) => car.brand,
      "comparator": comparator
    },
    "Model": {
      "getter": (car: Car) => car.model,
      "comparator": comparator
    }
  } as {[cName: string] : {
    "getter": (car: Car) => any;
    "comparator": (lhs: any, rhs: any) => number
  }};

  sortTable(cName: string) {
    if (this._sortKey === cName) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortKey = cName;
      this._sortDirection = 'asc';
    }

    const cData = this._sortHelper[cName];
  
    const cDataGetter = cData.getter;
    const cDataComparator = cData.comparator;
  
    this.cars = this.cars.sort((lhs, rhs) => {
      const vLhs = cDataGetter(lhs);
      const vRhs = cDataGetter(rhs);
  
      return this._sortDirection === 'asc'
        ? cDataComparator(vLhs, vRhs)
        : cDataComparator(vRhs, vLhs);
    });
  }

  openDetails(id: number){
    this._router.navigateByUrl(`cars/${id}`)
  }
}

function comparator<T>(lhs: T, rhs: T): number {
  if(lhs < rhs) return -1;
  if(lhs > rhs) return 1;
  return 0;
}
