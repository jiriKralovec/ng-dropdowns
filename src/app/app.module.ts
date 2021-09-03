import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DrpCmp } from './dropdowns/dropdown-menu';
import { DropdownDirective } from './dropdowns/dropdown-directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, DrpCmp, DropdownDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
