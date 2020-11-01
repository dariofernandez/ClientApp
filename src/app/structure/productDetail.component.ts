
import { Component } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "product-detail",
  templateUrl: "productDetail.component.html"
})


export class ProductDetailComponent {

  //  The current route is available through the ActivatedRoute class, which is defined in the @angular/
  //  router module.  The component receives an ActivatedRoute object, which will be provided by
  //  dependency injection, and uses its snapshot.params property to get the value of the id segment variable.
  //  If the variable has a value and it can be parsed into an integer, then details of the product are requested
  //  through the repository.If there is no value for the id segment or it cannot be parsed, then the Router object
  //  is used to navigate to the / URL, which will display the product table.

  constructor(private repo: Repository, router: Router, activeRoute: ActivatedRoute) {

    let id = Number.parseInt(activeRoute.snapshot.params["id"]);

    if (id) {
      this.repo.getProduct(id);
    } else {
      router.navigateByUrl("/");
    }
  }


  get product(): Product {
    return this.repo.product;
  }
}
