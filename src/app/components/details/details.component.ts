import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models/Car';
import { Observable, catchError, throwError } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListModifiedService } from 'src/app/services/list-modified.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  car!: Car;
  isLoading = true;
  isError = false;

  constructor(
    private _carsService: CarsService,
    private _route: ActivatedRoute,
    private _listModifiedService: ListModifiedService,
    private _router: Router
  ){}
  
  ngOnInit(): void {
    this.load().pipe(
      catchError(err => {
        this.isLoading = false;
        this.isError = true;
        return throwError(() => err);
      })
    ).subscribe( car => {
      this.isLoading = false;
      this.isError = false;
      this.car = car;
    })
  }

  load() : Observable<Car>{
    return this._carsService.getById(Number(this._route.snapshot.paramMap.get('id')));
  }

  goBack(){
      this._router.navigate(['/cars']);
  }

  deleteAndBack(){
    this._carsService.delete(this.car.id).subscribe();
    this._listModifiedService.notifyCarDeleted(this.car.id)
    this.goBack();
  }

  edit(){
    this._router.navigate([`/cars/edit/${this.car.id}`]);
  }
}
