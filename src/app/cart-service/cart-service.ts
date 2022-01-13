import { Injectable } from "@angular/core";
import { toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
import { BehaviorSubject } from "rxjs";
import {Post} from "../post.model"

@Injectable({
  providedIn: 'root'
})

export class CartService{

  public cartItemList :  any = []
  public productList = new BehaviorSubject<any>([])

  constructor(){}

  getProduct(){
    return this.productList.asObservable()
  }

  setProduct(product:any){
    this.cartItemList.push(...product)
    this.productList.next(product)
  }

  addtoCart(product:Post){

    if (this.cartItemList.includes(product)){
      this.cartItemList.map((a:Post,index:any)=>{
        if(a.id === product.id){
          this.cartItemList[index].quantity += 1
          this.cartItemList[index].total = parseInt(this.cartItemList[index].price) * this.cartItemList[index].quantity
        }
      })
    }
    else{
      console.log(product)
      this.cartItemList.push(product)
    }
    this.productList.next(this.cartItemList)
    console.log(this.productList)
  }



  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        if(product.quantity > 1){
          this.cartItemList[index].quantity -= 1
          this.cartItemList[index].total -= parseInt(this.cartItemList[index].price)
        }
        else{
          this.cartItemList.splice(index,1)
        }
      }
    })

  }

  getTotalPrice(): number{
    let grandTotal = 0
   this.cartItemList.map((a:any)=>{
     grandTotal = grandTotal + parseInt(a.total)
   })
   return grandTotal
 }

 gettotalProducts(): number{
    let totNum = 0
    this.cartItemList.map((a:any)=>{
      totNum = totNum + parseInt(a.quantity)
    })
    return totNum
 }



  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList)
  }

}
function parseNumber(quantity: any) {
  throw new Error("Function not implemented.");
}
