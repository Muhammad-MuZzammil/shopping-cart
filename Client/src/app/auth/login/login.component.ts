import { JwtService } from "./../../core/services/jwt.service";
import { ApiService } from "../../core/services/api.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Ilogin } from "../../core/models/login.model";
import { Router, ActivatedRoute } from "@angular/router";
import { GlobalService } from "src/app/shared/services/global.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginUser: Ilogin;

  formErrors = {};

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isToken()
    
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50)
        ]
      ],
      password: [
        "",
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
      ]
    });
  }
  isToken() {
    const token = this.jwtService.getToken()
    if(token){
      this.router.navigate(['home'])
    }
  }

  submitLogin() {
    console.log(this.loginForm.value);
    this.apiService.post("/auth", this.loginForm.value).subscribe(
      res => {
        console.log("Res", res);
        if (res.status) {
          this.jwtService.saveToken(res.token);
          this.router.navigate(["home"]);
        }
      },
      err => console.log(err.error.msg)
    );
  }
}
