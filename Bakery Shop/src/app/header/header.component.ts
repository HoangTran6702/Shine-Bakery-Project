import { Component, OnInit, Renderer2, ElementRef  } from '@angular/core';
import {Router} from '@angular/router'; 
import { product } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: String='default';
  sellerName:string='';
  userName:string='';
  isNavExpanded: boolean = false;
  searchResult: undefined | product[];
  cartItems=0;

  constructor(
    private route: Router , 
    private productService: ProductService,
    private el: ElementRef,
    private renderer: Renderer2,) { }

  ngOnInit() :void {
    this.route.events.subscribe((val:any)=> {
      if (val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore=localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType = 'seller';
        } 
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
          this.productService.getCartList(userData.id)
        }
        else {
          this.menuType='default'
        }
      }
    });

    //get number of products to cart
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.productService.cartData.emit([])
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        if (result.length > 4) {
          result.length = 4;
        }
        this.searchResult = result;
      });
    }
  }
  

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
  openSearch() {
    console.log('click')
    const nav = this.el.nativeElement.querySelector('nav');
    const searchField = this.el.nativeElement.querySelector('.search-field');
  
    if (nav && searchField) {
      this.renderer.setStyle(nav, 'height', '50vh');
      this.renderer.setStyle(searchField, 'display', 'flex');
  
      const closeNavListener = () => {
        this.renderer.setStyle(nav, 'height', '15vh');
        this.renderer.setStyle(searchField, 'display', 'none');
        nav.removeEventListener('mouseleave', closeNavListener);
      };
  
      // Thêm lắng nghe sự kiện mouseleave cho nav
      nav.addEventListener('mouseleave', closeNavListener);
    }
  }
  
  
}
