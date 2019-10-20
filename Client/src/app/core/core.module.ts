import { UserService } from './services/user.service';
import { JwtService } from "./services/jwt.service";
import { ApiService } from "./services/api.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    ApiService,
    JwtService,
    UserService]
})
export class CoreModule {}
