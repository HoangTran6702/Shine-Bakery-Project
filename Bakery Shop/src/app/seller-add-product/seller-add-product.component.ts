import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string|undefined;
  productData: product = { name: '', price: 0, category: '', taste: '', description: '', image: '', id: 0, categoryId: 0, quantity: 0, productId: undefined};
  constructor(private product:ProductService){
  }

  ngOnInit(): void {
  }
  submit(data:product) {
    this.product.addProduct(data).subscribe((result) =>{console.warn(result);
    if(result){
      this.addProductMessage='Product is successfully added';
      this.productData = { name: '', price: 0, category: '', taste: '', description: '', image: '', id: 0, categoryId: 0, quantity: 0, productId: undefined};
    }
    setTimeout(()=>this.addProductMessage=undefined,3000);
    })
}
}

