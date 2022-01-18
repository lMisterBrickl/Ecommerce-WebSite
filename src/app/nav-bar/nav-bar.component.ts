import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart-service/cart-service';




@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations:[
    trigger('sideBar',[
      transition(':enter',[
        style({transform:'scale(0,1)'}),animate('200ms ease-in')
      ]),
      transition(':leave',[
        animate('200ms ease-out',style({transform:'scale(0,1)'}))
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit,  OnDestroy {
  public mouseHover = false;
  var1: any
  public hideFilterBar = false;
  public hideGrey = true;
  private authListenerSubs: Subscription = new Subscription;
  public numItems : number = 0
  public isUserLogin = false
  public toggle =false

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


 // onOut(){
  // this.var1 = setTimeout(()=>{
  //    if(true)
  //      this.mouseHover = false
  //  },1100)
 // }
 // onIn(){
  //  clearTimeout(this.var1)
  //}

  onMenu(): void{
    if(this.hideFilterBar === true){
      this.hideFilterBar = false;
    }
    else{
      this.hideFilterBar= true;
    }
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
