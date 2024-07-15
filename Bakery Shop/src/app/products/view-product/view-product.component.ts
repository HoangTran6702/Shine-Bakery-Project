import { cart } from './../../data-type';
// import { product } from './../../data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  id: any;
  itemPro:any;
  // itemPro: undefined | product
  // quantity: number =1
  productQuantity: number =1
  removeCart = false
  cartData: undefined |product
  productData: undefined | product

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,  private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( data => {
      this.id = data.get('id');
    })
    this.getDetailProduct(this.id);
    console.warn(this.id)

    // let productId = this.activatedRoute.snapshot.paramMap.get('id')
    // console.warn(productId)
    this.id && this.productService.getProduct(this.id).subscribe((result)=>{
      let productId = this.id
      this.productData= result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId=== item.id.toString());
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.productService.getCartList(userId);

        this.productService.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.cartData=item[0];
        this.removeCart=true;
       }
        })
      }
      
      
      
    })
    // let productId = this.activatedRoute.snapshot.paramMap.get('id')
    // console.warn(productId)

    //user not login yet
    // let cartData = localStorage.getItem('localCart')
    // if(this.id && cartData){
    //   let items = JSON.parse(cartData)
    //   items = items.filter((item:product)=>this.id === item.id.toString())
    //   console.warn("item id", items)
    //   if(items.length){
    //     this.removeCart = true
    //   }
    //   else{
    //     this.removeCart = false
    //   }

    // }
    
  }


  getDetailProduct(id:any) {
    this.productService.viewProduct(id).subscribe(res => {
      this.itemPro = res;
    // console.warn(res)
    })
  }

  handleQuantity(value:string){
    if( value ==='plus'){
      this.productQuantity+=1
    }
    else if(this.productQuantity >1 && value ==='minus'){
      this.productQuantity-=1
    }
  }

  buyNow(){
    this.addToCart()
    this.router.navigate(['/cart-detail'])
  }

  addToCart(){
    if(this.itemPro){
      this.itemPro.quantity = this.productQuantity
      if(!localStorage.getItem('user')){
        this.productService.localAddToCart(this.itemPro)
        this.removeCart = true
        
      }
      else{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id

        let cartData: cart = {
          ...this.itemPro,
          productId: this.itemPro.id,
          userId: userId
        }
        //because productId = id, so remove id
        delete cartData.id
        this.productService.addToCart(cartData).subscribe((result:any)=>{
          if(result){
            this.productService.getCartList(userId)
            this.removeCart = true
          }
        })
        
      }
    }
  }

  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
      this.productService.removeItemsFromCart(productId)
    }
    else{
      console.warn("cartData: ", this.cartData)
      
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        this.productService.getCartList(userId)
      })
    }
    this.removeCart = false

  }
}
