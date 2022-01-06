import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { Post } from '../post.model'
import { CartService } from '../cart-service/cart-service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  posts: Post[] = [];
  private postSub: Subscription | undefined

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
