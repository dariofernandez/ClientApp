import { Injectable, NgZone } from "@angular/core";
import { Repository } from './models/repository';
import { Product } from './models/product.model';
import { NavigationService } from "./models/navigation.service";


interface DotnetInvokable {
  invokeMethod<T>(methodName: string, ...args: any): T;
  invokeMethodAsync<T>(methodName: string, ...args: any): Promise<T>;
}


@Injectable()
export class ExternalService {

  private resetFunction: (msg: string) => {};

    //   The window object provides access to the JavaScript runtime’s global scope and allows global variables
    //   to be read and defined.This statement creates a global property named angular_searchProducts, which the
    //   Blazor application will use to locate the Angular functionality.The global variable is assigned the doSearch
    //   method, with the important use of the bind method

  constructor(private repository: Repository, private zone: NgZone, private navService: NavigationService) {

    window["angular_searchProducts"] = this.doSearch.bind(this);

    window["angular_receiveReference"] = this.receiveReference.bind(this);

    navService.change.subscribe(update => {
      if (this.resetFunction) {
        this.resetFunction("Results reset");
      }
    });

  }


  async doSearch(searchTerm: string): Promise<Product[]> {
    return this.zone.run(async () => {
      this.repository.filter.search = searchTerm;

      return (await this.repository.getProducts()).data;
    })
  }

  receiveReference(target: DotnetInvokable) {
    this.resetFunction = (msg: string) => target.invokeMethod("resetSearch", msg);
  }

}
