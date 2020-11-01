import { Component } from '@angular/core';
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Router } from "@angular/router";


@Component({
  selector: "product-table",
  templateUrl: "./productTable.component.html"
})


export class ProductTableComponent {

  constructor(private repo: Repository, private router: Router) { }

  get products(): Product[] {
    return this.repo.products;
  }

  // routine is called by button click in productTable.component.html
  selectProduct(id: number) {
    this.repo.getProduct(id);
    this.router.navigateByUrl("/detail");
  }
}
