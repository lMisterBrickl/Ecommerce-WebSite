import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AuthData } from "../reg-data.model"

@Injectable({ providedIn: "root"})
export class AuthService{


    public realAuthdata:any
    private token:any

    constructor(private http: HttpClient, private router: Router){}



    createUser(email: string, password:string, username:string, replayPassword:string){
        if(password!=replayPassword){
            return
        }else{
            const authData: AuthData = {email: email, password: password, username: username}
            this.realAuthdata = authData
            console.log(authData)
            this.http.post("http://localhost:3000/api/adminRegister", authData)
            .subscribe(response =>{
                console.log(response)
                this.router.navigate(['/login'])
        })
        }
        
    }

}