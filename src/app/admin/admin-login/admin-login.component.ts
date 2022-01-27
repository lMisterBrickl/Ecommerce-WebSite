import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private authService:AuthService) { }


  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return
    }
    else{
      this.authService.logiUser(form.value.email, form.value.password, form.value.username)
     
    }
  }

}
