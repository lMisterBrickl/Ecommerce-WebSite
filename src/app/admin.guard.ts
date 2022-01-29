import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
    UrlTree
}from "@angular/router"
import { HttpClient } from "@angular/common/http"; 
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable({providedIn:"root"})
export class AdminGuard implements CanActivate{
    public category:any
    public   isAdmin: any
    public username = {username: localStorage.getItem("username")}
constructor(private authService: AuthService,private router:Router, private http: HttpClient){}
    canActivate(): any  {
       
        this.http.post("http://localhost:3000/api/getRole", this.username).subscribe(response =>{
            this.category = response
            this.isAdmin = this.category.role
            console.log(this.isAdmin)
            if(this.isAdmin==0){
                return this.isAdmin
            }
            else { 
                this.router.navigate(["/"])
                return false
            }
        })
        
       
        
       
    }
}