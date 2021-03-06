import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { AddContactComponent } from './add-contact/add-contact.component';


const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: PhoneBookComponent },
  { path: 'add', component: AddContactComponent },
  { path: '**', component: PhoneBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
