import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart-service/cart-service';
import {PostsService} from '../posts.service'



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
  public username:any
  public newUsername:boolean = false
  public product : any =[]

  constructor(public router: Router, private cartService: CartService, private authService: AuthService, private postService: PostsService) {
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
    
    if(window.screen.width < 1024){
      this.hideFilterBar = false
    }
    else{
      this.hideFilterBar = true
    }

    this.cartService.getProduct().subscribe(res=>{
      this.product = res.result
      console.log(res)
      this.numItems = this.product.length()
      
    })

    this.authListenerSubs = this.authService.getAuthListener().subscribe(isUserAuth=>{
      this.isUserLogin = isUserAuth
    })

   }

   onSearchProduct(form: string){
      let type = form
      console.log(type)
      this.postService.getSpecificProduct(type)
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
