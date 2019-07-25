import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../login';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login = { email: "nadeem@abc.com", password: "nadeem@123" };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;

  submitted = false;

  

  constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }
  
  get fail() { return this.loginForm.controls; }

  login() {
    this.submitted = true; 
    console.log(this.loginForm.controls);

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    else{
      if(this.fail.email.value == this.model.email && this.fail.password.value == this.model.password){
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.fail.email.value);
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.message = "Please check your email and password";
      }
    }    
}

}
