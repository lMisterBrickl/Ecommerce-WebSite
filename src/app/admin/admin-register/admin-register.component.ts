import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm){
    if(form.invalid){
      return
    }else{
      this.authService.createUser(form.value.email, form.value.password, form.value.username, form.value.retryPassword)
    }

  }

}
