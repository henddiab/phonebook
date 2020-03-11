import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ServiceService } from "./../service.service"


@Component({
  selector: "app-phone-book",
  templateUrl: "./phone-book.component.html",
  styleUrls: ["./phone-book.component.css"]
})
export class PhoneBookComponent implements OnInit {
  contacts: any = [];
  toggle: boolean = true;
  user;

  constructor(private service: ServiceService) { }
  edit(event, fName, lName, phone, img) {
    this.service.getSigleData(event.target.id).subscribe(data => {
      localStorage.setItem("user", JSON.stringify(data));
    })

    this.user = {
      fName: fName.innerText,
      lName: lName.innerText,
      phone: phone.innerText,
      img: img.src,
      id: event.target.id
    }

    this.service.user = this.user

  }

  delete(event) {
    console.log(event.target.id);
    this.service.deleteContact(event.target.id).subscribe();
  }

  save() {
    this.toggle = !this.toggle;
  }
  ngOnInit() {

    this.service.getData().subscribe(data => {
      this.contacts = data;
    });

    this.service.BehaviorSubjectData.subscribe(items => {
      console.log(items)

      this.contacts.push(items)
      console.log(this.contacts)
    })
  }
}
