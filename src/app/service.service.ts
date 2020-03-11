import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs'




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  user;

  private BehaviorSubject = new BehaviorSubject({});
  BehaviorSubjectData = this.BehaviorSubject.asObservable();

  postData(newContact, { headers }) {
    return this.http.post("http://localhost:3000/data", newContact, { headers });
  }

  getData() {
    return this.http.get("http://localhost:3000/data");
  }

  getSigleData(id) {
    return this.http.get("http://localhost:3000/data/" + id);
  }

  editContact(id, body) {
    return this.http.put("http://localhost:3000/data/" + id, body);
  }

  deleteContact(id) {
    return this.http.delete("http://localhost:3000/data/" + id)
  }

  constructor(private http: HttpClient) {
  }
  nextfun(data) {
    this.BehaviorSubject.next(data)
  }

}

