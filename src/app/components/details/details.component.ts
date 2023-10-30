import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models/Car';
import { Observable, catchError, throwError } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  goBack(deletedCarId?: number){
    if(deletedCarId === undefined){
      this._router.navigate(['/cars']);
    } else {
      /*
       * Not the nicest solution, it's error-prone and invites mischeovious users
       * to wreak havoc in the car list, but it works for a demo purpose. 
       * More subtle solution would be to create a service shared between list 
       * and detailed view and emit-consume ids of deleted cars through it.
       * Another arguably better (but more demanding from the server point of view)
       * is to force list component to reload its data from the servet, it can be done
       * the same way as this solution, send a flag through queryParams. Yet another way
       * is to implemen two-way data binding between list and detailed view, but this
       * solution would require much stronger coupling between two components,
       * they must 'know of each other'. Sending queryParams through router.navigate(...)
       * is much less demanding from this point of view. Like always - there is really
       * no perfect fit-for-all solution and every aspect must be concidered while
       * choosing one.
       */
      this._router.navigate(['/cars'], { queryParams: { deletedCarId: deletedCarId } });
    }
  }

  delete(){
    this._carsService.delete(this.car.id).subscribe();
    this.goBack();
  }
}
