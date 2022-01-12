import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./reg-data.model"

@Injectable({ providedIn: "root"})
export class AuthService{
    constructor(private http: HttpClient){}

    createUser(email: string, password:string, username:string){
        const authData: AuthData = {email: email, password: password, username: username}
        
        //console.log(authData.username)
        this.http.post("http://localhost:3000/api/register", authData)
        .subscribe(response =>{
            console.log(response)
        })
        //console.log(authData)
    }

    logiUser(email:string, password: string, username: string){
        const authData: AuthData = {email: email, password: password, username: username}
        this.http.post("http://localhost:3000/api/login", authData)
         .subscribe(response => {
             console.log(response);
         })
    }

}