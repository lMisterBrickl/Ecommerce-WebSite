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
    trigger('burger',[
      transition(':enter',[
        style({opacity:0,transform:'rotateY(-180deg)'}),animate('300ms')
      ])
    ]),
    trigger('sideBar',[
      transition(':enter',[
        style({transform:'translateX(-100%)'}),animate('300ms ease-in')
      ]),
      transition(':leave',[
        animate('300ms ease-out',style({transform:'translateX(-100%)'}))
      ])
    ])
  ]
})
export class NavBarComponent implements OnInit,  OnDestroy {
  public mouseHover = false;
  var1: any
  private authListenerSubs: Subscription = new Subscription;
  public numItems : number = 0
  public isUserLogin = false

  public toggle=false
  public username:any
  public newUsername:boolean = false


  constructor(public router: Router, private cartService: CartService, private authService: AuthService) {
  }


  ngOnInit(): void {

    this.isUserLogin = this.authService.getisAuth()
    this.username = this.authService.getUsername()
    if(this.username && this.isUserLogin){
      this.newUsername = true
    }
    else{
      this.newUsername = false
    }

    this.cartService.getProduct().subscribe(res=>{
      this.numItems = this.cartService.gettotalProducts()
    })

    this.authListenerSubs = this.authService.getAuthListener().subscribe(isUserAuth=>{
      this.isUserLogin = isUserAuth
    })

   }

  onLogOut(){
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }

}
