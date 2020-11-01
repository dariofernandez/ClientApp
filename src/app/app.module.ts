import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelModule } from './models/model.module';

// import { ProductTableComponent } from "./structure/productTable.component"
// import { CategoryFilterComponent } from "./structure/categoryFilter.component"
// import { ProductDetailComponent } from "./structure/productDetail.component";

import { FormsModule } from '@angular/forms';
import { StoreModule } from "./store/store.module";
import { ExternalService } from "./external.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandler.service";
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { AccountComponent } from './account/account.component';
import { TextInputComponent } from './shared/components/text-input/text-input.component';
import { SectionHeaderComponent } from './core/section-header/section-header.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, AccountComponent, TextInputComponent, SectionHeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ModelModule, FormsModule, StoreModule],
  providers: [ExternalService, ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: ErrorHandlerService, multi: true
    }],
  bootstrap: [AppComponent]
})


export class AppModule {
  constructor(external: ExternalService) { }
}

