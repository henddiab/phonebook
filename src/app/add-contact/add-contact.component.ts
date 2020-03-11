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
  addContact: FormGroup; //form
  fileData: File = null; 
  userData; // all contacts data
  checker: boolean = true;  // to check on phone redunduncy
  imagee: any;
  imageSrc: any = "https://www.gateshead.church/dowo/wp-content/uploads/2019/09/person-icon.png"; // default image



  constructor(private service: ServiceService, private router: Router) { }

  readURL(event: any) {
    this.fileData = <File>event.target.files[0]; // to get type of file and check on  it, then read value of image
    this.preview();
  }
  preview() {
    //check that files shown are only images
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // read value of selected image
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

  // function loop on all data and check if phone is already found
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


    //get all data
    this.service.getData().subscribe(data => {
      this.userData = data;
    });
  }


  onSubmit() {

    var headers = { 'Content-Type': 'application/json' };
    if (this.check(this.addContact)) {
      this.service.postData(this.addContact.value, { headers }).subscribe(response => {
        this.service.nextfun(response); // get updates
      });
      this.router.navigate(["/contacts"]);
    }

    else {
      alert('phoneNumber Found, enter another one');
    }
  }
}
