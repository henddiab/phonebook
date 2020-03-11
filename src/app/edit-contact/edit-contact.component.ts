import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  EditContact: FormGroup;
  fileData: File = null;
  imagee: any;





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
      this.service.user.img = reader.result;
      this.imagee = reader.result;
      this.EditContact.patchValue({
        image: this.imagee
      });
    };
  }

  ngOnInit() { 

    this.EditContact = new FormGroup({
      image: new FormControl(this.service.user.img),
      firstName: new FormControl(this.service.user.fName, [Validators.required, Validators.pattern(/^[a-z]{4,}$/)]),
      lastName: new FormControl(this.service.user.lName, [Validators.required, Validators.pattern(/^[a-z]{4,}$/)]),
      mobileNumber: new FormControl(this.service.user.phone, [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)])
    });
  }



  onSubmit() {
    var newContact = this.EditContact;
    this.service.editContact(this.service.user.id, newContact.value).subscribe(response => {
      console.log(response);
      this.service.nextfun(response)
      this.router.navigate(["/contacts"]);
    });

  }
}


