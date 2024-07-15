import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { category } from 'src/app/data-type';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categoryList: category[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategory().subscribe( data => {
      this.categoryList = data;
    })
  }
}
