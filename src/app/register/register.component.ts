import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router ) { }
  public isLoading = false

  ngOnInit(): void {
    if(this.authService.getisAuth()){
      this.router.navigate([""])
    }
  }
  
  onRegister(form: NgForm){
    if(form.invalid){
      return
    }else{
      this.authService.createUser(form.value.email, form.value.password, form.value.username)
      this.isLoading = true
    }
  }
}
