import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Post } from "./post.model"
import { HttpClient } from "@angular/common/http"


@Injectable({providedIn: 'root'})
export class PostsService{
  private posts:any
  private postsUpdated = new Subject<Post[]>()
  constructor(private http: HttpClient){}

  getPost(){
    this.http.get<{message:string, posts:Post[]}>("http://localhost:3000/api/posts").subscribe((postData)=>{
      this.posts = postData.posts
      this.postsUpdated.next([...this.posts]);

    });
  }

  getSpecificProduct(type:string){
    this.http.get(`http://localhost:3000/api/specificPosts/${type}`).subscribe((response) =>{
      this.posts = response
      // console.log(this.posts.posts)
      this.postsUpdated.next(this.posts.posts);
    })
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }
}
