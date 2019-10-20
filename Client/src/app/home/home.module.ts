import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [HomeComponent],
  exports:[HomeComponent]
})
export class HomeModule { }
