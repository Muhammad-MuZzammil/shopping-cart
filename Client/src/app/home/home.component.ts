import { ApiService } from "./../core/services/api.service";
import { JwtService } from "./../core/services/jwt.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isAuth: boolean = true;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}
electronicItem=[]
  ngOnInit() {
    this.isToken();
    this.apiService.get("/products").subscribe(res => {
      console.log(res);
      this.electronicItem = res
    });
  }
  logout() {
    this.jwtService.destroyToken();
    this.router.navigateByUrl('/login');
  }
  isToken() {
    const token = this.jwtService.getToken();
    if (token) {
      this.isAuth = false;
    }
  }
}
