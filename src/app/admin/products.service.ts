import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { productData } from "./product.model";

@Injectable({ providedIn: "root"})
export class productService{

    constructor(private http: HttpClient, private router: Router){}

    createProduct(title: string, price: string, specification: string, photo: string, quantity: string, type:string){
        const newProduct : productData = {title: title, price: price, specification: specification, photo: photo, quantity: quantity, type:type}
        console.log(newProduct)
        this.http.post("http://localhost:3000/api/addProduct", newProduct)
        .subscribe(response=>{
            console.log(response)
        })
    }
}