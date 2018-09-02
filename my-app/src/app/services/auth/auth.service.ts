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
  groups: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username:string){ //Function to access server data available for given user
    return this.http.post<user>('/api/auth', {'username': username,httpOptions});
  }
}
