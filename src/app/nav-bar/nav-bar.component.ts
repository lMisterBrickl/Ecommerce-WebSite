import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../cart-service/cart-service';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public mouseHover = false;
  var1: any
  public hideFilterBar = true;
  public hideGrey = true;

  public numItems : number = 0

  constructor(public router: Router, private cartService: CartService) {
  }


  ngOnInit(): void {
    if(window.screen.width < 1024){
      this.hideFilterBar = false
    }
    else{
      this.hideFilterBar = true
    }

    this.cartService.getProduct().subscribe(res=>{
      this.numItems = res.length
    })

   }


  onOut(){
   this.var1 = setTimeout(()=>{
      if(true)
        this.mouseHover = false
    },1100)
  }
  onIn(){
    clearTimeout(this.var1)
  }

  onMenu(): void{
    this.hideFilterBar = true
    if(this.hideFilterBar === true){
      this.hideGrey = false
    }
    else
    this.hideGrey = true
  }

  hideMenu(): void{
    this.hideFilterBar = false
  }


}
