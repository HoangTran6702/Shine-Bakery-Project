import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { DetailNewsComponent } from './detail-news/detail-news.component';
import { EventComponent } from './event/event.component';
import { InstructionComponent } from './instruction/instruction.component';
import { NewsComponent } from './news/news.component';
import { PostDescriptionComponent } from './post-description/post-description.component';
import { PromotionComponent } from './promotion/promotion.component';
import { SearchComponent } from './search/search.component';
import { UpdatenewsComponent } from './updatenews/updatenews.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
// import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SellerAuthComponent,
    HeaderComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    UserAuthComponent,
    // ProductsComponent,
    // SidebarComponent,
    CartPageComponent,
    CartDetailsComponent,
    MyOrderComponent,
    DetailNewsComponent,
    EventComponent,
    InstructionComponent,
    NewsComponent,
    PostDescriptionComponent,
    PromotionComponent,
    SearchComponent,
    UpdatenewsComponent,
    AboutusComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    BrowserAnimationsModule,
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
