import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product, cart, priceSummary, localCart } from './../data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
  cartData:cart[]|undefined
  priceSummary: priceSummary ={
    price: 0,
    discount: 0,
    tax: 0,
    delivery:0,
    total: 0
  }
  totalCartPrice: number = 0;
  localCartData: any

  

  constructor(private productService: ProductService, private router:Router){

  }
  ngOnInit(): void {
      this.loadDetails()
  }

  removeToCart(cartId: number|undefined){
    cartId && this.cartData && this.productService.removeToCart(cartId).subscribe((result)=>{
      this.loadDetails()
    })
  }

  cartDetail(){
    this.router.navigate(['/cart-detail'])

  }

  loadDetails(){
    if(localStorage.getItem('localCart')){
      console.log('localCart available')
      let localCartData = localStorage.getItem('localCart');
      if(localCartData){
       this.localCartData = JSON.parse(localCartData)
       this.calculateTotalPrice()
      }
    }

    else{
      this.productService.currentCart().subscribe((result)=>{
        this.cartData = result
        console.warn(this.cartData)
        let price = 0
        result.forEach((item)=>{
          if(item.quantity){
            price = price+ (+item.price * item.quantity)
          }
        })
        this.priceSummary.price = price
        // this.priceSummary.discount = price/10
        // this.priceSummary.tax = price/10
        // this.priceSummary.delivery = 20000
        this.priceSummary.total = price 
        // +(price/10) + 20000 - (price/10)
        
        console.warn(this.priceSummary)
      })
    }
 
  }
  calculateTotalPrice(): void {
    // Retrieve data from localStorage
    const localStorageData = localStorage.getItem('localCart');

    if (!localStorageData) {
      console.warn('No data found in localStorage');
      return;
    }

    // Parse the JSON string from localStorage to get the array
    const cartItems: localCart[] = JSON.parse(localStorageData);

    // Calculate total price
    this.totalCartPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
