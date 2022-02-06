import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { Post } from "./post.model"
import { HttpClient } from "@angular/common/http"


@Injectable({providedIn: 'root'})
export class PostsService{
  private posts:any
  private product= new BehaviorSubject<any>({})
  private postsUpdated = new Subject<Post[]>()
  constructor(private http: HttpClient){}

  getPostUpdateListener(){
    return this.postsUpdated.asObservable()
  }
  getPost(): void{
    this.http.get<{message:string, posts:Post[]}>("http://localhost:3000/api/posts").subscribe((postData)=>{
      this.posts = postData.posts
      this.postsUpdated.next([...this.posts]);

    });
  }
  getProduct(id:string){
    this.http.get(`http://localhost:3000/api/product/${id}`).subscribe((product)=>{
      this.product.next(product)
      })
  return this.product.asObservable()
}
  upload(foto:File): void{

    const data= new FormData();
    data.append("foto",foto)
    console.log(data)
    this.http.post("http://localhost:3000/api/upload",data).subscribe()
  }

  


  getSpecificProduct(type:string): void{
    this.http.get(`http://localhost:3000/api/specificPosts/${type}`).subscribe((response) =>{
      this.posts = response
      // console.log(this.posts.posts)
      this.postsUpdated.next(this.posts.posts);
    })
  }

  getOnSearch(search:string): void{
    this.http.get(`http://localhost:3000/api/search/${search}`).subscribe(response =>{
      this.posts = response
      this.postsUpdated.next(this.posts.posts);
    })
  }

}

