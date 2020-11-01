import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSelectionComponent } from './store/productSelection.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutDetailsComponent } from './store/checkout/checkoutDetails.component';
import { CheckoutPaymentComponent } from './store/checkout/checkoutPayment.component';
import { CheckoutSummaryComponent } from './store/checkout/checkoutSummary.component';
import { OrderConfirmationComponent } from './store/checkout/orderConfirmation.component';


// 'admin' route uses a dynamic import statement that will load the bundle file for the administration
//    module only when the application first navigates to the / admin URL
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(module => module.AdminModule),
  },
  { path: 'checkout/step1', component: CheckoutDetailsComponent },
  { path: 'checkout/step2', component: CheckoutPaymentComponent },
  { path: 'checkout/step3', component: CheckoutSummaryComponent },
  { path: 'checkout/confirmation', component: OrderConfirmationComponent },
  { path: 'checkout', redirectTo: '/checkout/step1', pathMatch: 'full' },
  { path: 'cart', component: CartDetailComponent },
  { path: 'store/:category/:page', component: ProductSelectionComponent },
  { path: 'store/:categoryOrPage', component: ProductSelectionComponent },
  { path: 'store', redirectTo: 'store/', pathMatch: 'full' },

 // lazy loading only when account is activated,we load the module
  {path: 'account',
    loadChildren: () => import('./account/account.module')
    .then(mod => mod.AccountModule), data: {breadcrumb: {skip: true}}},


  // { path: '', redirectTo: 'store/', pathMatch: 'full' }
  { path: '**', redirectTo: '', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
