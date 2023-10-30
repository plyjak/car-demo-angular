import { Component, Input, OnInit } from '@angular/core';
import { CarsService } from './services/cars.service';
import { Car } from './models/Car';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
}
