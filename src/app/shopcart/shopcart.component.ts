import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart-service/cart-service';


@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.scss']
})
export class ShopcartComponent implements OnInit {

  public product : any =[]
  public grandTotal !: number


  constructor(private cartService: CartService) { }


  ngOnInit(): void {
      this.cartService.getProduct().subscribe(res=>{
        this.product = res
        this.grandTotal = this.cartService.getTotalPrice()
      })
  }

  deleteItem(item: any){
    this.cartService.removeCartItem(item)
    this.grandTotal = this.cartService.getTotalPrice()
  }

  emptycart(){
    this.cartService.removeAllCart()
  }


}
