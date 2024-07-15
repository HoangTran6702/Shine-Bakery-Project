import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PostNewsService } from '../services/post-news.service';
import { product, postnews } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;
  postList: undefined | postnews[];
  PostMessage: undefined|string;

  constructor(private productService: ProductService, private postNewsService: PostNewsService) {}

  ngOnInit(): void {
    this.getProductList();
    this.getPostList();
  }

  deleteProduct(id: number) {
    console.warn("test id", id);

    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is deleted";
        this.getProductList();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
   deletePost(id: number) {
    console.warn("Set ID", id);

    this.postNewsService.deletePost(id).subscribe((result) => {
      if (result) {
        this.PostMessage = "Post is deleted";
        this.getPostList();
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  getProductList() {
    this.productService.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
    });
  }

  getPostList() {
    this.postNewsService.postList().subscribe((result) => {
      console.warn(result);
      this.postList = result;
    });
  }
}
