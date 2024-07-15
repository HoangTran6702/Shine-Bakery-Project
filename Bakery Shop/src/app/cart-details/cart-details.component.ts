import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product, cart, priceSummary, order, localCart } from './../data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit{
  cartData:cart[]|undefined
  orderMsg: string|undefined
  priceSummary: priceSummary ={
    price: 0,
    discount: 0,
    tax: 0,
    delivery:0,
    total: 0
  }
  orderFormData = {
    name: '',
    email: '',
    tel: '',
    address: '',
    city: '',
    district: '',
    shipMethod: 'store',
    payMethod: 'online'
  };
  localCartData: any
  totalCartPrice: number = 0
  totalPayment: number = 0
  
  constructor(private productService: ProductService, private router:Router){

  }

  ngOnInit(): void {
    if(localStorage.getItem('localCart')){
      let localCartData = localStorage.getItem('localCart');
      if(localCartData){
       this.localCartData = JSON.parse(localCartData)
       this.calculateTotalPrice()
      }
    }
    else{
      this.productService.currentCart().subscribe((result)=>{
        this.cartData = result
        // console.warn(this.cartData)
        let price = 0
        this.cartData =result
        result.forEach((item)=>{
          if(item.quantity){
            price = price+ (+item.price * item.quantity)
  
          }
        })
        this.priceSummary.price = price
        this.priceSummary.discount = price/10
        this.priceSummary.tax = price/10
        this.priceSummary.delivery = 0
        this.priceSummary.total = price 
        // +(price/10) + 20000 - (price/10)
        
      })
    }
  }

  updateShippingFee() {
    if(localStorage.getItem('localCart')){
      if (this.orderFormData.shipMethod === 'shipping') {
        // If the selected shipping method is 'shipping', update the shipping fee
        this.priceSummary.delivery = 20000
        this.totalPayment = this.totalCartPrice +  this.priceSummary.delivery
        console.warn(this.totalPayment)
      } else {
        // If the selected shipping method is 'store', set the shipping fee to 0
        this.priceSummary.delivery = 0
        this.totalPayment = this.totalCartPrice
        console.warn(this.totalPayment)
      }
    }
    else{
      if (this.orderFormData.shipMethod === 'shipping') {
        // If the selected shipping method is 'shipping', update the shipping fee
        this.priceSummary.delivery = 20000;
        this.priceSummary.total = this.priceSummary.price + this.priceSummary.delivery;
      } else {
        // If the selected shipping method is 'store', set the shipping fee to 0
        this.priceSummary.delivery = 0;
        this.priceSummary.total = this.priceSummary.price + this.priceSummary.delivery
      }
    }
    // Update the total by adding the new delivery fee
    // this.priceSummary.total = this.priceSummary.price + this.priceSummary.delivery;
  }

  orderNow(data:{name:string,
                  email:string,
                  tel:string,
                  address:string,
                  city:string,
                  district:string,
                  shipMethod: string,
                  payMethod:string,              
  }){
    if(localStorage.getItem('localCart')){
      let localCart = localStorage.getItem('localCart')
      let userId= undefined
      if(this.totalPayment){
        let orderData: order ={
          ...data,
          totalPrice: this.totalPayment,
          userId,
          shipMethod:this.orderFormData.shipMethod,
          payMethod: this.orderFormData.payMethod,
          id:undefined
        }
        
        this.productService.orderNow(orderData).subscribe((result)=>{
          if(result){
            this.orderMsg= "Order has been placed"
            localStorage.clear();
          }
          
        })
        alert('Order Has been placed')
      }
    }
    else{
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      if(this.priceSummary.total){
        let orderData:order = {
          ...data,
          totalPrice: this.priceSummary.total,
          userId,
          shipMethod:this.orderFormData.shipMethod,
          payMethod: this.orderFormData.payMethod,
          id:undefined
        }
        this.cartData?.forEach((item)=>{
          setTimeout(()=>{
            item.id && this.productService.deleteCartItems(item.id)
          },700)
        })
  
        this.productService.orderNow(orderData).subscribe((result)=>{
          if(result){
            this.orderMsg= "Order has been placed"
            // setTimeout(()=>{
            //   this.orderMsg = undefined
            //   this.router.navigate(['/my-order'])
            // },4000)
            
          }
          
        })
        alert('Order Has been placed')
      }
      alert('Order Has been placed')
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
