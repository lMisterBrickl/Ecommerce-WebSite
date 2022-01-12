import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public authService: AuthService ) { }

  
  onRegister(form: NgForm){
    if(form.invalid){
      return
    }else{
      this.authService.createUser(form.value.email, form.value.password, form.value.username)
    }
  }

}
