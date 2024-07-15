import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult: product[] | undefined;
  originalSearchResult: product[] | undefined; 
  price: number | undefined;
  category: string | undefined;
  selectedPriceRange: string | undefined; 
  uniqueCategories: string[] = [];
  query:string|undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.query = params['query'];
      console.log(this.query);
  
      if (this.query) {
        this.productService.searchProducts(this.query).subscribe((result) => {
          this.originalSearchResult = result;
          this.searchResult = [...result];
          
          // Lọc ra các category duy nhất
          this.uniqueCategories = Array.from(new Set(result.map(product => product.category)));
          
          // Mặc định, hiển thị danh sách sản phẩm được sắp xếp theo giá từ thấp đến cao
          this.sortProductsByPrice('Low to High');
        });
      }
    });
  }
  sortProductsByPrice(order: string): void {
    if (this.originalSearchResult) {
      this.searchResult = [...this.originalSearchResult]; // Clone để giữ nguyên dữ liệu gốc
      this.searchResult.sort((a, b) => {
        const priceA = Number(a.price);
        const priceB = Number(b.price);
        return order === 'High to Low' ? priceB - priceA : priceA - priceB;
      });
    }
  }
  
  filterProductsByCategory(selectedCategory: string): void {
    if (this.originalSearchResult) {
      if (selectedCategory === 'All') {
        // Nếu chọn 'All', hiển thị toàn bộ sản phẩm gốc và sắp xếp theo giá từ thấp đến cao
        this.searchResult = [...this.originalSearchResult];
        this.sortProductsByPrice('Low to High');
      } else {
        // Nếu chọn một category khác, lọc và cập nhật lại mảng
        this.searchResult = this.originalSearchResult.filter(product => product.category === selectedCategory);
      }
    }
  }
  
  
  

  filterProductsByPriceRange(range: string): void {
    if (this.originalSearchResult) {
      this.searchResult = range === 'All'
        ? [...this.originalSearchResult] // Hiển thị toàn bộ sản phẩm nếu chọn 'All'
        : this.originalSearchResult.filter(product => this.filterByPriceRange(product.price, range));
    }
  }

  private filterByPriceRange(price: number, range: string): boolean {
    const numericPrice = Number(price);
    switch (range) {
      case '0-25000':
        return numericPrice <= 25000;
      case '25000-50000':
        return numericPrice > 25000 && numericPrice <= 50000;
      case '50000-100000':
        return numericPrice > 50000 && numericPrice <= 100000;
      case 'Over: 100000':
        return numericPrice > 100000;
      default:
        return true;
    }
  }
  offFilter(): void {
    // Sử dụng Renderer2 để thay đổi thuộc tính CSS display của phần tử
    const filterElement = this.el.nativeElement.querySelector('.filter'); // Điều này cần phải tương ứng với lớp hoặc selector của phần tử bạn muốn ẩn
    const displayElement = this.el.nativeElement.querySelector('.display-product-search');
    const openElement = this.el.nativeElement.querySelector('.navi-open');
    this.renderer.setStyle(filterElement, 'display', 'none', );
    this.renderer.setStyle(displayElement, 'margin-left', '10vw', );
    this.renderer.setStyle(openElement, 'display', 'flex', );
  }
  openFilter(): void {
    // Sử dụng Renderer2 để thay đổi thuộc tính CSS display của phần tử
    const filterElement = this.el.nativeElement.querySelector('.filter'); // Điều này cần phải tương ứng với lớp hoặc selector của phần tử bạn muốn ẩn
    const displayElement = this.el.nativeElement.querySelector('.display-product-search');
    const openElement = this.el.nativeElement.querySelector('.navi-open');
    this.renderer.setStyle(filterElement, 'display', 'flex', );
    this.renderer.setStyle(displayElement, 'margin-left', '24vw', );
    this.renderer.setStyle(openElement, 'display', 'none', );
  }
}


