import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    
  ],
  exports:[]
})
export class AuthModule { }
