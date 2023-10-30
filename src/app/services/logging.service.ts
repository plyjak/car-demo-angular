import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
  export class LoggingService {
    log(caller: any, msg: string){
      console.log(`${caller.constructor.name}: ${msg}`);
  }
    error(caller: any, msg: string){
      console.error(`${caller.constructor.name}: ${msg}`);
  }
}
