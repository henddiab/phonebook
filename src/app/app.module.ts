import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { PhoneBookComponent } from "./phone-book/phone-book.component";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { FormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [AppComponent, PhoneBookComponent, AddContactComponent, FilterPipe],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule, FormsModule, Ng2SearchPipeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
