import { Component, OnInit } from "@angular/core";
import { ServiceService } from "./../service.service"
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: "app-phone-book",
  templateUrl: "./phone-book.component.html",
  styleUrls: ["./phone-book.component.css"]
})
export class PhoneBookComponent implements OnInit {

  addContact: FormGroup;
  contacts: any = [];
  fileData: File = null;
  imagee: any;
  user;


  constructor(private service: ServiceService, private router: Router) { }
  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }
  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.user.image = reader.result;
      this.imagee = reader.result;
      this.addContact.patchValue({
        image: this.imagee
      });
    };
  }


  // get data of contact to be editted
  edit(event) {
    this.service.getSigleData(event.target.id).subscribe(data => {
      this.user = data;
    })
  }


  onSubmit() {

    this.service.editContact(this.user.id, this.addContact.value).subscribe(response => {
      this.service.nextfun(response);


      //get data again after editting
      this.service.getData().subscribe(data => {
        this.contacts = data;
      })
    });
  }


  // delete contact
  delete(event, contact) {
    console.log(event.target.id);
    contact.remove();
    this.service.deleteContact(event.target.id).subscribe();
  }

  ngOnInit() {

    this.addContact = new FormGroup({
      image: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-z]{4,}$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-z]{4,}$/)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)])
    });

    this.service.getData().subscribe(data => {
      this.contacts = data;
    });

    // push new updates
    this.service.BehaviorSubjectData.subscribe(items => {
      this.contacts.push(items);
    })
  }
}
