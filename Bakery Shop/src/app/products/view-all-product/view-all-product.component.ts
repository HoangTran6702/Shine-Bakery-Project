import { Component } from '@angular/core';
import { product } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-all-product',
  templateUrl: './view-all-product.component.html',
  styleUrls: ['./view-all-product.component.css']
})
export class ViewAllProductComponent {
  productList: product[]=[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.productList().subscribe((data) => {
      this.productList = data; 
    });
  }

}
