import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class JwtService {
  constructor() {}

  getToken(): string {
    return window.localStorage["jwtToken"];
  }
  saveToken(token: string) {
    window.localStorage["jwtToken"] = token;
  }
  destroyToken() {
    window.localStorage.removeItem("jwtToken");
  }
}
