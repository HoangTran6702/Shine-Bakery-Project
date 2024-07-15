import { ViewProductComponent } from './products/view-product/view-product.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductsComponent } from './products/products.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { MyOrderComponent } from './my-order/my-order.component';
import {SearchComponent} from './search/search.component';
import {NewsComponent} from './news/news.component'
import {PostDescriptionComponent} from './post-description/post-description.component'
import {EventComponent} from './event/event.component'
import {InstructionComponent} from './instruction/instruction.component'
import {PromotionComponent} from './promotion/promotion.component'
import { DetailNewsComponent } from './detail-news/detail-news.component'
import {UpdatenewsComponent} from './updatenews/updatenews.component'
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },

  {
    path:'aboutus',
    component:AboutusComponent
  },

  {
    path:'seller-auth',
    component:SellerAuthComponent
  },

  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate: [authGuard]
  },

  {
    path:'seller-add-product',
    component:SellerAddProductComponent
  },

  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate: [authGuard]
  },

  {
    path:'user-auth',
    component:UserAuthComponent,
  },
  // Product 
  { path: 'products', 
  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) 
  },

  {
    path: 'details/:id',
    component: ViewProductComponent,

  },
  {
    path:'cart-page',
    component: CartPageComponent
  },
  {
    path:'cart-detail',
    component: CartDetailsComponent
  },
  
  {
    path:'my-order',
    component:MyOrderComponent
  },
  {
    component: SearchComponent,
    path: 'search/:query',
    data: {state:  'Search'}
  },
  {
    path:'post-news',
    component:PostDescriptionComponent,
    data: {state:  'post'}
  },
  {
    path:'news',
    component:NewsComponent,
    data: {state:  'News'}
  
  },
  {
    path:'news/event',
    component:EventComponent,
    data: {state:  'Event'}
  },
  {
    path:'news/instruction',
    component: InstructionComponent,
    data: {state:  'Instruction'}
  },
  {
    path:'news/promotion',
    component: PromotionComponent,
    data: {state:  'Promotion'}
  },
  {
    path:'news/updatepost/:id',
    component:UpdatenewsComponent
  },
  { path: 'news/:id', component: DetailNewsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
