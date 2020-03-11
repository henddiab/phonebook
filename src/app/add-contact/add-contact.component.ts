import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServiceService } from "./../service.service"

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.css"]
})
export class AddContactComponent implements OnInit {
  addContact: FormGroup;
  fileData: File = null;
  userData;
  checker: boolean = true;
  imagee: any;
  imageSrc: any = "https://www.gateshead.church/dowo/wp-content/uploads/2019/09/person-icon.png";
  arr = [];



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
      this.imageSrc = reader.result;
      this.imagee = reader.result;
      this.addContact.patchValue({
        image: this.imagee
      });
    };
  }
  check(form: FormGroup) {

    if (this.userData.length > 0) {
      for (let index = 0; index < this.userData.length; index++) {
        if (form.value.mobileNumber == this.userData[index].mobileNumber) {
          this.checker = false;
          break;
        }
        else {
          this.checker = true;
        }
      }
    }

    return this.checker;
  }

  ngOnInit() {
    this.addContact = new FormGroup({
      image: new FormControl(this.imagee, Validators.required),
      firstName: new FormControl(null, [Validators.required,Validators.pattern(/^[a-z]{4,}$/)]),
      lastName: new FormControl(null,[Validators.required,Validators.pattern(/^[a-z]{4,}$/)]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)])
    });

    this.service.getData().subscribe(data => {
      this.userData = data;
    });
  }


  onSubmit() {
    var newContact = this.addContact;
    var headers = { 'Content-Type': 'application/json' };
    if (this.check(newContact)) {
      this.service.postData(newContact.value, { headers }).subscribe(response => {
        console.log(response);
        this.service.nextfun(response);
      });
      this.router.navigate(["/contacts"]);
    }

    else {
      alert('phoneNumber Found, enter another one')
    }
  }
}
