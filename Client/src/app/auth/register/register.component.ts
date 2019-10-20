import { Router } from '@angular/router';
import { JwtService } from "./../../core/services/jwt.service";
import { ApiService } from "../../core/services/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
    ) {}
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  ngOnInit() {
    this.isToken()
  }
  isToken() {
    const token = this.jwtService.getToken();
    if (token) {
      this.router.navigate(["home"]);
    }
  }
  onSubmit() {
    console.log(this.registerForm.value);
    this.apiService.post("/register", this.registerForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err.error);
      }
    );
  }
}
