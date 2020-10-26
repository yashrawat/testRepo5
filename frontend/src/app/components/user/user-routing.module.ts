import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'wishlist', component: WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
