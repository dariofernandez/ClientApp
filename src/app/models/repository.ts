import { Product } from "./product.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Filter, Pagination } from "./configClasses.repository";
import { Supplier } from "./supplier.model";
import { Observable } from "rxjs";
import { Order, OrderConfirmation } from "./order.model";


const productsUrl = "/api/products";
const suppliersUrl = "/api/suppliers";
const sessionUrl = "/api/session";
const ordersUrl = "/api/orders";



type productsMetadata = {
    data: Product[],
    categories: string[];
}


////The overall effect is that when a new instance of the Repository class is created,
////  the constructor calls the getProducts method,
////    which sends an HTTP request to the web service and uses the JSON data received
////  in response to set the product property,
////    which can be accessed by the rest of the application.

@Injectable()
export class Repository {

  product: Product;
  products: Product[];
  suppliers: Supplier[] = [];
  categories: string[] = [];
  filter: Filter = new Filter();
  paginationObject = new Pagination();
  orders: Order[] = [];



  constructor(private http: HttpClient) {
    //this.filter.category = "soccer";
    this.filter.related = true;
    this.getProducts();
  }

  // the httpClient.get metho returns an Observable<Product>
  //  the subscribe method is used to invoke a function when the work represented by the Observable has completed
  //  the data received (p) is assigned to a property (productData)
  //  For the most part, you don’t work directly with observables in an Angular
  //    application because they are used behind the scenes, but one exception is when you need to introduce data
  //    into the application, such as from a web service.

  getProduct(id: number) {
  //  this.http.get<Product>("/api/products/" + id)

    this.http.get<Product>(`${productsUrl}/${id}`)
      .subscribe(p => this.product = p);
  }





  getProducts(): Promise<productsMetadata> {
    let url = `${productsUrl}?related=${this.filter.related}`;

    if (this.filter.category) {
      url += `&category=${this.filter.category}`;
    }

    if (this.filter.search) {
      url += `&search=${this.filter.search}`;
    }
    url += "&metadata=true";

    return this.http.get<productsMetadata>(url)
      .toPromise<productsMetadata>()
      .then(md => {
        this.products = md.data;
        this.categories = md.categories;

        return md;
      });
  }


   // the httpClient.get metho returns an Observable<Supplier>
  // the subscribe method is used to invoke a function when the work represented by the Observable has completed
  // the data received (sups) is assigned to a property (suppliers)
  getSuppliers() {
    // sends http get '/api/suppliers' that is being served by SupplierValuesController.cs
    this.http.get<Supplier[]>(suppliersUrl)
      .subscribe(sups => this.suppliers = sups);
  }


  createProduct(prod: Product) {

    let data = {
      name: prod.name, category: prod.category,
      description: prod.description, price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };

    this.http.post<number>(productsUrl, data)
      .subscribe(id => {
        prod.productId = id;
        this.products.push(prod);  // add it to the array
      });
  }



  createProductAndSupplier(prod: Product, supp: Supplier) {

    let data = {
      name: supp.name, city: supp.city, state: supp.state
    };

    this.http.post<number>(suppliersUrl, data)
      .subscribe(id => {
        supp.supplierId = id;
        prod.supplier = supp;
        this.suppliers.push(supp);    // add it to the array
        if (prod != null) {
          this.createProduct(prod);
        }
      });
  }


  replaceProduct(prod: Product) {
    let data = {
      name: prod.name, category: prod.category,
      description: prod.description, price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };

    this.http.put(`${productsUrl}/${prod.productId}`, data)

      .subscribe(() => this.getProducts());
  }


  replaceSupplier(supp: Supplier) {
    let data = {
      name: supp.name, city: supp.city, state: supp.state
    };

    this.http.put(`${suppliersUrl}/${supp.supplierId}`, data)

      .subscribe(() => this.getProducts());
  }


  //The updateProduct method receives a number parameter that identifies the Product to be modified and
  //  a Map object whose keys are the names of the properties that have changed.A simple JSON Patch document
  //  is created using the replace operation for each of the entries in the Map, which is then sent to the web service
  //  using an HTTP PATCH request.

  updateProduct(id: number, changes: Map<string, any>) {
    let patchObj = [];

    changes.forEach((value, key) =>
      patchObj.push({ op: "replace", path: key, value: value }));

    // send patch (document) object
    this.http.patch(`${productsUrl}/${id}`, patchObj)
      .subscribe(() => this.getProducts());   // reload the data from web service
  }

  deleteProduct(id: number) {
    this.http.delete(`${productsUrl}/${id}`)
      .subscribe(() => this.getProducts());   // reload the data
  }
  deleteSupplier(id: number) {
    this.http.delete(`${suppliersUrl}/${id}`)
      .subscribe(() => {
        this.getProducts();     // reload the data
        this.getSuppliers();
      });
  }


  storeSessionData<T>(dataType: string, data: T) {
    return this.http.post(`${sessionUrl}/${dataType}`, data)
      .subscribe(response => { });
  }


  getSessionData<T>(dataType: string): Observable<T> {
    return this.http.get<T>(`${sessionUrl}/${dataType}`);
  }


  getOrders() {
    this.http.get<Order[]>(ordersUrl)
      .subscribe(data => this.orders = data);
  }



  createOrder(order: Order) {
    this.http.post<OrderConfirmation>(ordersUrl, {
      name: order.name,
      address: order.address,
      payment: order.payment,
      products: order.products
    }).subscribe(data => {
      order.orderConfirmation = data
      order.cart.clear();
      order.clear();
    });
  }



  shipOrder(order: Order) {
    this.http.post(`${ordersUrl}/${order.orderId}`, {})
      .subscribe(() => this.getOrders())
  }

  // identity p.320
    //  The login method sends an HTTP POST request to the web service, and unlike the other methods in
    //  the repository, it returns an Observable<Response>, which will allow the outcome of the authentication
    //  request to be monitored.Unlike the data - related operations that the SportsStore supports, authentication
    //  requires immediate feedback to the user and so updates cannot be left to the normal Angular update system.

  login(name: string, password: string): Observable<boolean> {
    return this.http.post<boolean>("/api/account/login", { name: name, password: password });
  }

    //  The logout method also sends an HTTP POST request to the web service but doesn’t allow the response to
    //  be observed(but calls the subscribe method, without which the request will not be sent).
  logout() {
    this.http.post("/api/account/logout", null).subscribe(response => { });
  }


}
