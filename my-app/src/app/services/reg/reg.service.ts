import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

export interface user{
  username: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class RegService {

  constructor(private http:HttpClient) { }

  addUser(username:string,role:string,email:string){ // Function to send off data to be written to authdata.JSON file
    return this.http.post<user>('/api/reg', {'username': username,'role':role,'email':email,httpOptions});
  }
}
