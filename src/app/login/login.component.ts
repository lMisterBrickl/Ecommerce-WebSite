import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }
  public isLoading = false


  ngOnInit(): void {

  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.logiUser(form.value.email, form.value.password, form.value.username)
    this.isLoading = true
  }

}
