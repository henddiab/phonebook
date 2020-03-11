import { Component, OnInit } from "@angular/core";
import { ServiceService } from "./../service.service"
import { Router } from '@angular/router';


@Component({
  selector: "app-phone-book",
  templateUrl: "./phone-book.component.html",
  styleUrls: ["./phone-book.component.css"]
})
export class PhoneBookComponent implements OnInit {
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
      console.log(this.user);

      this.imagee = reader.result;
    };
  }


  edit(event) {
    this.service.getSigleData(event.target.id).subscribe(data => {
      this.user = data;
    })
  }

  onSubmit(img, fName, lName, phone) {
    
    this.user.firstName = fName.value;
    this.user.lastName = lName.value;
    this.user.image = img.value;
    this.user.mobileNumber = phone.value;

    this.service.editContact(this.user.id, this.user).subscribe(response => {
      this.service.nextfun(response);

      this.service.getData().subscribe(data => {
        this.contacts = data;
      })
    });
  }

  delete(event, contact) {
    console.log(event.target.id);
    contact.remove();
    this.service.deleteContact(event.target.id).subscribe();
  }

  ngOnInit() {

    this.service.getData().subscribe(data => {
      this.contacts = data;
    });

    this.service.BehaviorSubjectData.subscribe(items => {

      this.contacts.push(items)
    })
  }
}
