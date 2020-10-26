import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/utils/homepage/homepage.component';
import { PagenotfoundComponent } from './components/utils/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'product', loadChildren: () => import('./components/product/product.module').then(p => p.ProductModule) },
  { path: 'cart', loadChildren: () => import('./components/cart/cart.module').then(c => c.CartModule) },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(a => a.AuthModule) },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
