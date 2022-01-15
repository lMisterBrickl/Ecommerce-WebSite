import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart-service/cart-service';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit,  OnDestroy {
  public mouseHover = false;
  var1: any
  public hideFilterBar = true;
  public hideGrey = true;
  private authListenerSubs: Subscription = new Subscription;
  public numItems : number = 0
  public isUserLogin = false

  constructor(public router: Router, private cartService: CartService, private authService: AuthService) {
  }


  ngOnInit(): void {
    if(window.screen.width < 1024){
      this.hideFilterBar = false
    }
    else{
      this.hideFilterBar = true
    }

    this.cartService.getProduct().subscribe(res=>{
      this.numItems = this.cartService.gettotalProducts()
    })

    this.authListenerSubs = this.authService.getAuthListener().subscribe(isUserAuth=>{
      this.isUserLogin = isUserAuth
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

  onLogOut(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }

}
