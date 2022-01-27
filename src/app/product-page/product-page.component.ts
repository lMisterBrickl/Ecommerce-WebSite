import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart-service/cart-service';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import {Post} from '../post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  public product:Post
  public productSub:Subscription

  constructor(public postService: PostsService,private cartService:CartService , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.postService.getProduct(this.route.snapshot.params.id)
    this.productSub = this.postService.getProductListener().subscribe((product:Post) => {
      this.product = product
      })
  }


}
