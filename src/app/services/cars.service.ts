import { Injectable } from '@angular/core';
import { Car } from '../models/Car';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private _url: string = 'http://localhost:8080/api/cars'
  private readonly _httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _loggingService: LoggingService,
    private _http: HttpClient
  ){}

  getFiltered(
    platesFilter?: string,
    minYopFilter?: number,
    maxYouFilter?: number,
    brandFilter?: string,
    modelFilter?: string
  ): Observable<Car[]>{
    let params = new HttpParams();
    if(platesFilter !== undefined){
      params = params.append('plates', platesFilter);
    }
    if(minYopFilter !== undefined){
      params = params.append('minYop', minYopFilter);
    }
    if(maxYouFilter !== undefined){
      params = params.append('maxYop', maxYouFilter);
    }
    if(brandFilter !== undefined){
      params = params.append('brand', brandFilter);
    }
    if(modelFilter !== undefined){
      params = params.append('model', modelFilter);
    }

    return this._http.get<Car[]>(this._url, {params: params}).pipe(
      tap(_ => this.log('All filtered instances of Car fetched')),
      tap(resp => this.log(`Number of fetched entities: ${resp.length}`)),
      catchError(this.handleError<Car[]>('getFiltered')),
    )
  }

  getById(carId: number): Observable<Car>{
    return this._http.get<Car>(`${this._url}/${carId}`).pipe(
      tap(_ => this.log(`Car w/ id=${carId} fetched`)),
      catchError(this.handleError<Car>('getById')),
    )
  }

  delete(id: number): Observable<Car> {
    const url = `${this._url}/${id}`;
    return this._http.delete<Car>(url, this._httpOptions)
      .pipe(
        tap(_ => this.log(`deleted Car w/ id=${id}`)),
        catchError(this.handleError<Car>(`delete Car w/ id=${id}`))
      );
  }

  add(car: Car): Observable<Car> {
    return this._http.post<Car>(this._url, car, this._httpOptions)
      .pipe(
        tap((car: Car) => this.log(`added Car w/ id=${car.id}`)),
        catchError(this.handleError<Car>(`add Car`))
      );
  }

  update(car: Car): Observable<any> {
    return this._http.put(`${this._url}/${car.id}`, car, this._httpOptions)
      .pipe(
          tap(_ => this.log(`updated Car w/ id=${car.id}`)),
          catchError(this.handleError<any>(`update Car w/ id=${car.id}`))
      );
  }


  private log(msg: string){
    this._loggingService.log(this, msg);
  }

  private error(msg: string){
    this._loggingService.error(this, msg);
  }

  protected handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      this.error(`${operation} failed: ${error.message}`);
      return throwError(() => error);
    }
  }
}
