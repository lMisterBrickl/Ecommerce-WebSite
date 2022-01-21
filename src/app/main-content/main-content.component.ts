import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { Post } from '../post.model'
import { CartService } from '../cart-service/cart-service';
import { trigger,transition, animate,style, state, query } from '@angular/animations';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  animations:[
    trigger('title',[
      transition(':enter',[
        style({transform:'translateX(120%)'}), animate('0.5s 500ms ease-in')
        
        ]),
      transition(':leave',[
        animate('200ms ease-out',style({opacity:0}))
      ]),
    ]),
    trigger('text',[
      transition(':enter',[
        style({transform:'translateX(150%'}),animate('0.8s 500ms ease-in')
      ])
    ]),
    trigger('image',[
      transition(':enter',[
        style({transform:'translateX(-120%)'}),animate('0.2s 500ms ease-in')
      ])
    ])
  ]
})
export class MainContentComponent implements OnInit {

  posts: Post[] = [];
  private postSub: Subscription | undefined
  public i=0
  images = ["../../assets/images/tvpng.png", "../../assets/images/iphone12.jpg", "../../assets/images/pcscump.jpg", "../../assets/images/TV.jpg"];

  constructor(public postService: PostsService,private cartService:CartService) { }


  ngOnInit(): void {
    this.postService.getPost()
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts:Post[]) => {
      this.posts = posts
      this.posts.forEach((a:any)=>{
        Object.assign(a,{total:a.price})
      })
    })
    this.carouselanimation()
  }

  addToCart(item:Post){
    this.cartService.addtoCart(item)
  }
  carouselanimation(){
    if(this.i==0){
        this.i=1
    }
    else{
      this.i=0
    }
    setTimeout(() => {
      this.carouselanimation()
    }, 6000);
    
  }
}
