import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart-service/cart-service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.scss']
})
export class ShopcartComponent implements OnInit {

  public product : any =[]
  public grandTotal !: number


  constructor(private cartService: CartService, private navbar:NavBarComponent) { }


  ngOnInit(): void {
      this.cartService.getProduct().subscribe(res=>{
        this.product = res.result
        this.grandTotal = this.cartService.getTotalPrice()
      })
  }

  deleteItem(item: any){
    this.cartService.removeCartItem(item)
    this.grandTotal = this.cartService.getTotalPrice()
    this.navbar.ngOnInit()
  }

  emptycart(){
    this.cartService.removeAllCart()
  }


}
