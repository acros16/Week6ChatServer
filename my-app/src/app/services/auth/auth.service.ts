import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface user{
  username: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username:string){
    return this.http.post<user>('/api/auth/', {'username': username});
  }
  getEmail(email:string){
    return this.http.post<user>('/api/auth/', {'email': email});
  }
  getRole(role:string){
    return this.http.post<user>('/api/auth/', {'role':role});
  }
}
