import { Component, OnDestroy, OnInit } from '@angular/core';
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
  public productSub:Subscription | undefined

  constructor(public postService: PostsService ,private cart:CartService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.productSub = this.postService.getProduct(this.route.snapshot.params.id).subscribe((product) => {
      this.product = product.product
      
      })
  }

}
