import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
    UrlTree
}from "@angular/router"
import { HttpClient } from "@angular/common/http"; 
import { Observable, Subscription } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable({providedIn:"root"})
export class AdminGuard implements CanActivate{
    // /public category:any
    private category : Subscription | undefined
    private isAdmin:boolean
    public username = {username: localStorage.getItem("username")}
    constructor(private authService: AuthService,private router:Router, private http: HttpClient){}
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): any  {
        if(this.authService.getisAuth()){
            
            this.authService.getrole()
            this.category = this.category= this.authService.getRoleUpdateListener().subscribe(data =>{
                if(data == 0){
                    return true
                }
                else{
                    this.router.navigate(["/"])
                    return false
                }
                
            })
           return true
            // console.log(this.category)
        }
        else{
            this.router.navigate(["/"])
            return false
        }
         
    }
}