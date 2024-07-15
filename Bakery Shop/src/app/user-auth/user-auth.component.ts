import { Component, OnInit } from '@angular/core';
import { login,product,signUp, cart } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true
  authError:string="";
  constructor(private user: UserService, private product:ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      // console.warn(result);
      if(result){
         this.authError="User not found"
      } else
      {
        this.localCartToRemoteCart()
      }
      
    })
  }
  openSignUp(){
    this.showLogin=false
  }
  openLogin(){
    this.showLogin=true;
  }

  //add user cart to database
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    // console.warn(userId)
    if(data){
      let cartDataList:product[] = JSON.parse(data)
      cartDataList.forEach((product:product, index)=>{
        let cartData: cart={
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id
        //because Json server can't load lots of APIs or mayny request at the same time
        //, should give it a time out
        setTimeout(()=>{
          this.product.addToCart(cartData).subscribe((result)=>{
            console.warn("data is stored in DB")
          })
        },500)
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
      })
    }

    setTimeout(()=>{
      this.product.getCartList(userId)
    },1000)
    
  }

}