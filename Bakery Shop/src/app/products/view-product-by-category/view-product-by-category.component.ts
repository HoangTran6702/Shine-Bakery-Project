import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css']
})
export class ViewProductByCategoryComponent implements OnInit{

  constructor(
    private activateRoute: ActivatedRoute, 
    private productService: ProductService) {}

  searchCategory: any;
  productList: any;

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe( data => {
      this.searchCategory = data.get('id');
      });
    this.getProductCatId(this.searchCategory)
  }

  getProductCatId(id:any) {
    this.productService.searchCategoryProduct(id).subscribe((categoryData) => {
      this.productList = categoryData;
    });
  }
}
