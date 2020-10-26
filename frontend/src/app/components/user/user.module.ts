import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AccountComponent,
    OrderHistoryComponent,
    WishlistComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule
  ]
})
export class UserModule { }
