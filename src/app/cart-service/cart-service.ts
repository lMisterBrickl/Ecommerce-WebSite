import { Injectable } from "@angular/core";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth.service";
import {Post} from "../post.model"
import { HttpClient } from "@angular/common/http";
import {Router}from "@angular/router"


@Injectable({
  providedIn: 'root'
})

export class CartService{

  public cartItemList :  any 
  public productList = new BehaviorSubject<any>([])
  public username: any
  public cart:any


  constructor(public authService: AuthService, public http: HttpClient, private router: Router){}

  public getProduct(){
    this.http.post("http://localhost:3000/api/findUser", "hello").subscribe(response =>{
      this.username = response
      this.http.get(`http://localhost:3000/api/getCart/${this.username.result}`).subscribe(response =>{
        this.productList.next(response)
        
        // console.log(this.productList)
      })
    })
    // console.log(this.productList.getValue().result)
    return this.productList.asObservable()
  }

  getUsername(product:any){
    this.http.post("http://localhost:3000/api/findUser", "hello").subscribe(response =>{
      this.http.post("http://localhost:3000/api/addToCart", [product, response]).subscribe(response =>{
        // console.log(response)
    })
    })
  }

  addtoCart(product:Post){
    this.getUsername(product) 
  }



  removeCartItem(product: any){
    console.log(product)
    this.http.post("http://localhost:3000/api/findUser", "hello").subscribe(response =>{
      this.http.post("http://localhost:3000/api/removeProduct", [product, response]).subscribe(res =>{
        console.log(res)
      })
    })

    // this.cartItemList.map((a:any, index:any)=>{
    //   if(product.id === a.id){
    //     if(product.quantity > 1){
    //       this.cartItemList[index].quantity -= 1
    //       this.cartItemList[index].total -= parseInt(this.cartItemList[index].price)
    //     }
    //     else{
    //       this.cartItemList.splice(index,1)
    //     }
    //   }
    // })

  }

  getTotalPrice(): number{
   let grandTotal = 0
   this.cartItemList = this.productList.getValue().result
   for(let i of this.cartItemList){
     grandTotal = grandTotal + parseInt(i.price)
   }
   return grandTotal
 }

//  gettotalProducts(cart:any){
//     // console.log(typeof cart)
//     // console.log(cart)
//     this.productList.next(cart.result)

//     return this.productList 
//     // return cart.result.length
//  }



  removeAllCart(){

    this.http.post("http://localhost:3000/api/findUser", "hello").subscribe(response =>{
      this.http.post("http://localhost:3000/api/destroyCart", response).subscribe(result =>{
        console.log(result)
      })
    })
    this.getProduct()
    this.router.navigate(["/"])
  }
}


function parseNumber(quantity: any) {
  throw new Error("Function not implemented.");
}
