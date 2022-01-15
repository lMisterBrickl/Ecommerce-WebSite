import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./reg-data.model"
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root"})
export class AuthService{
    private token: any
    constructor(private http: HttpClient, private router: Router){}
    private authStatusListener = new Subject<boolean>()
    private isAuthenticated = false

    getToken(){
        return this.token
    }

    getAuthListener(){
        return this.authStatusListener.asObservable()
    }

    getisAuth(){
        return this.isAuthenticated;
    }

    createUser(email: string, password:string, username:string){
        const authData: AuthData = {email: email, password: password, username: username}
        
        //console.log(authData.username)
        this.http.post("http://localhost:3000/api/register", authData)
        .subscribe(response =>{
            console.log(response)
            this.router.navigate(['/login'])
        })
        //console.log(authData)
    }

    logiUser(email:string, password: string){
        const authData: AuthData = {email: email, password: password, username: "any"}
        this.http.post<{token: string}>("http://localhost:3000/api/login", authData)
         .subscribe(response => {
             const token = response.token 
             this.token = token
             if(token){
                this.isAuthenticated = true
                this.authStatusListener.next(true)
                this.router.navigate(['/'])
             }
            
         })
    }

    logout(){
        this.token = null
        this.isAuthenticated = false
        this.authStatusListener.next()
        this.router.navigate(['/'])
    }

}