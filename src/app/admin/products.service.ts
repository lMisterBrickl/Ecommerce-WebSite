import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { productData } from "./product.model";


@Injectable({ providedIn: "root"})
export class productService{  
    private postsUpdated = new Subject<productData>()
   
    

    constructor(private http: HttpClient, private router: Router){}
    
    createProduct(title: string, price: string, specification: string, photo: File, quantity: string, type:string){
        const newProduct = new FormData();
        console.log(photo)
        newProduct.append("title", title)
        newProduct.append("price", price)
        newProduct.append("specification", specification)
        newProduct.append("photo", photo)
        newProduct.append("quantity", quantity)
        newProduct.append("type", type)
      
        this.http.post("http://localhost:3000/api/addProduct", newProduct)
        .subscribe(response=>{
            console.log(response)
        })
    }

    searchProduct(title:string){
        this.http.get<{message:string, posts:any}>(`http://localhost:3000/api/searchProd/${title}`).subscribe(response =>{
        this.postsUpdated.next(response.posts);
        })
    }

    updateSearchProduct(title: string, price: string, specification: string, photo: File, quantity: string, type:string){
        const newProduct = new FormData();
  
        newProduct.append("title", title)
        newProduct.append("price", price)
        newProduct.append("specification", specification)
        newProduct.append("photo", photo)
        newProduct.append("quantity", quantity)
        newProduct.append("type", type)

        this.http.post("http://localhost:3000/api/updateProduct", newProduct)
        .subscribe(response=>{
            console.log(response)
        })
    }

    deleteSearchProduct(title: string){
        this.http.post("http://localhost:3000/api/deleteProduct", title)
        .subscribe(response=>{
            console.log(response)
        })
    }

    getSearchedProd(){
        return this.postsUpdated.asObservable()
    }
}