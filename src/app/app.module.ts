import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  AppComponent,
  DropdownComponent,
  DropdownDirective
} from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DropdownComponent, DropdownDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
