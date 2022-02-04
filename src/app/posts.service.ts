import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Post } from "./post.model"
import { HttpClient } from "@angular/common/http"
import { Image } from "angular-responsive-carousel"


@Injectable({providedIn: 'root'})
export class PostsService{
  private posts:any
  private product= new Subject<Post>()
  private postsUpdated = new Subject<Post[]>()
  constructor(private http: HttpClient){}

  getPost(){
    this.http.get<{message:string, posts:Post[]}>("http://localhost:3000/api/posts").subscribe((postData)=>{
      this.posts = postData.posts
      this.postsUpdated.next([...this.posts]);

    });
  }
  getProduct(id:string){
    this.http.get<Post>(`http://localhost:3000/api/product/${id}`).subscribe((product)=>{
      this.product.next(product)
  }
  )
}
  upload(foto:File){

    const data= new FormData();
    data.append("foto",foto)
    console.log(data)
    this.http.post("http://localhost:3000/api/upload",data).subscribe()
  }

  

  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }
  getProductListener(){
    return this.product.asObservable()
  }

  getSpecificProduct(type:string){
    this.http.get(`http://localhost:3000/api/specificPosts/${type}`).subscribe((response) =>{
      this.posts = response
      // console.log(this.posts.posts)
      this.postsUpdated.next(this.posts.posts);
    })
  }

  getOnSearch(search:string){
    this.http.get(`http://localhost:3000/api/search/${search}`).subscribe(response =>{
      this.posts = response
      this.postsUpdated.next(this.posts.posts);
    })
  }

}

