import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./reg-data.model"
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root"})
export class AuthService{
    private token: any
    public LoginUsername : any
    public isAdmin: number
    private authStatusListener = new Subject<boolean>()
    private role = new Subject<Number>()
    private isAuthenticated = false
    private category:any
    private realAuthdata:any
    private tokenTimer: NodeJS.Timer; 
    constructor(private http: HttpClient, private router: Router){}

    getToken(){
        return this.token
    }

    getAuthListener(){
        return this.authStatusListener.asObservable()
    }

    getisAuth(){
        return this.isAuthenticated;
    }

    createUser(email: string, password:string, username:string, retryPassowrd: String){
        if(retryPassowrd != password){
            return
        }
        else{
            const authData = {email: email, password: password, username: username}
            this.realAuthdata = authData
            this.http.post("http://localhost:3000/api/register", authData)
            .subscribe(response =>{
                console.log(response)
                this.router.navigate(['/login'])
        })

        }
    }

    logiUser(email:string, password: string,username:string){
        const authData = {email: email, password: password, username: username}
        
        const newUsername = authData.username
        this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/login", authData)
         .subscribe(response => {
             const token = response.token 
             this.token = token    
             console.log(this.isAdmin)
             if(token){
                const expiresInDuration = response.expiresIn
                this.setAuthTimer(expiresInDuration)
                this.isAuthenticated = true
                this.getUsername()
                this.authStatusListener.next(true)
                const timeNow = new Date()
                const expireDate = new Date(timeNow.getTime() + (expiresInDuration * 1000))
                this.saveAuthData(token,expireDate,newUsername,this.isAdmin)
                this.router.navigate(['/'])
                this.LoginUsername = response
                // this.getLoginUser()
               
             }
            
         })
    }

    getrole(){
        this.http.post("http://localhost:3000/api/getRole", '').subscribe(response =>{
                this.category = response
                this.role.next(this.category.role)
               
            })

    }
    getRoleUpdateListener(){
        return this.role.asObservable()
      }
    
 

    remainAuth(){
        const authInfo = this.getAuthData() 
        if(!authInfo){
            return
        }
        const nowTime = new Date()
        const expireIn = authInfo.expirationDate.getTime() - nowTime.getTime()
        if(expireIn > 0){
            this.token = authInfo?.token
            this.isAuthenticated = true
            this.setAuthTimer(expireIn / 1000)
            this.authStatusListener.next(true)
        }
    }



    logout(){
        this.http.post("http://localhost:3000/api/logout", localStorage.getItem("token")).subscribe(response =>{
            console.log(response)
        })
        this.token = null
        this.isAuthenticated = false
        this.authStatusListener.next()
        clearTimeout(this.tokenTimer)
        this.cleareAuthData()
        this.router.navigate(['/'])
        this.getUsername()
    }


    private saveAuthData(token:string, expirationDate: Date, username:string, category: number){
        localStorage.setItem('token',token)
        localStorage.setItem('expiration', expirationDate.toISOString())
        localStorage.setItem("username", username)

    }

    private setAuthTimer(duration:number){
        console.log("set timer: " + duration)
        this.tokenTimer = setTimeout(()=>{
            this.logout()
        }, duration * 1000)
    }

    private cleareAuthData(){
        localStorage.removeItem("token")
        localStorage.removeItem("expiration")
        localStorage.removeItem("username")
    }


    public getUsername(){
        const token = localStorage.getItem("token")
        const expireDatee = localStorage.getItem("expiration") 
        const username = localStorage.getItem("username")
        if(!token || !expireDatee){
            return undefined
        }
        return username
    }




    private getAuthData(){
        const token = localStorage.getItem("token")
        const expireDatee = localStorage.getItem("expiration") 
       
        if(!token || !expireDatee){
            return undefined
        }
        return {
            token:token,
            expirationDate: new Date(expireDatee)
           
        }
    }
}