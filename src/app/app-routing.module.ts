import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';

const routes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:id', component: DetailsComponent },
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
