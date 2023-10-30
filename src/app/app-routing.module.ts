import { NgModule } from '@angular/core';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';

const routes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'cars/new', component: EditCarComponent, pathMatch: 'full' },
  { path: 'cars/:id', component: DetailsComponent },
  { path: 'cars/edit/:id', component: EditCarComponent },
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
