import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { Post } from '../post.model'
import { CartService } from '../cart-service/cart-service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  posts: Post[] = [];
  private postSub: Subscription | undefined
  images = ["../../assets/images/carousel-laptop.jpg", "../../assets/images/iphone12.jpg", "../../assets/images/pcscump.jpg", "../../assets/images/TV.jpg"];

  constructor(public postService: PostsService,private cartService:CartService) { }


  ngOnInit(): void {
    this.postService.getPost()
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts:Post[]) => {
      this.posts = posts
      this.posts.forEach((a:any)=>{
        Object.assign(a,{total:a.price})
      })
    })
  }

  addToCart(item:Post){
    this.cartService.addtoCart(item)
  }

}
