import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart-service/cart-service';
import { PostsService } from '../posts.service';




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
  public product : any =[]
  public toggle=false
  public username:any
  public newUsername:boolean = false
  public search:string


  constructor(public router: Router, private cartService: CartService, private authService: AuthService, private postService:PostsService) {
  }


  ngOnInit(): void {

    this.isUserLogin = this.authService.getisAuth()
    this.username = this.authService.getUsername()
    console.log(this.username)
    if(this.username && this.isUserLogin){
      this.newUsername = true
    }
    else{
      this.newUsername = false
    }

    this.cartService.getProduct().subscribe(res=>{
      console.log(res)
      for(let i of Object.entries(res)){
        this.product = res.result
      }
      this.numItems = this.product.length
    })

    this.authListenerSubs = this.authService.getAuthListener().subscribe(isUserAuth=>{
      this.isUserLogin = isUserAuth
    })

   }
  

  onSearch(){
    this.postService.getOnSearch(this.search)
  }

  onSearchProduct(form: string){
    let type = form
    console.log(type)
    this.postService.getSpecificProduct(type)
 }

  onLogOut(){
    this.authService.logout()
    this.username = this.authService.getUsername()
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }

}
