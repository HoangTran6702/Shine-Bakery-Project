import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewProductByCategoryComponent } from './view-product-by-category/view-product-by-category.component';
import { ViewAllProductComponent } from './view-all-product/view-all-product.component';

const routes: Routes = [
  { path: '', component: ViewAllProductComponent },
  { path: 'category/:id', component: ViewProductByCategoryComponent},
  { path: 'product/:id', component: ViewProductComponent},
  { path: 'view-product/:id', component: ViewProductComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }