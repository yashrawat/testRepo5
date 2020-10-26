import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [ProductsListComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
