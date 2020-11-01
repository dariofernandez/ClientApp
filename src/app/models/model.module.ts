import { NgModule } from "@angular/core";
import { Repository } from "./repository";
import { HttpClientModule } from '@angular/common/http';  //to make Http requests (web service)
import { NavigationService } from "./navigation.service";
import { Cart } from "./cart.model";
import { Order } from './order.model';

  //NgModule tells Angular that the ModelModule class is an Angular feature module p.61

  //register the Cart class as a service, which will allow other classes, including components, to
  //declare a constructor dependency that will be resolved using dependency injection and will ensure that
  //a single Cart object is shared throughout the application

@NgModule({
  imports: [HttpClientModule],
  providers: [Repository, NavigationService, Cart, Order]
})


export class ModelModule { }

