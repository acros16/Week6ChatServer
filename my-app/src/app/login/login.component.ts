import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from "@angular/router";
import { FormsModule } from '.../../node_modules/@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';

  constructor(socketService:SocketService, private authServ:AuthService,private router:Router, private form:FormsModule){}

  ngOnInit(){
  }
  loginUser(event){
    event.preventDefault();
    //Function to access data for given user. Stores data in localstorage
    this.authServ.login(this.username).subscribe(
      data=>{
        localStorage.setItem('username',data["username"]);
        localStorage.setItem('email',data["email"]);
        localStorage.setItem('role', data["role"]);
        localStorage.setItem('groups', JSON.stringify(data["groups"]));
        this.router.navigate(['/chat']);
        console.log("login "+localStorage.getItem("username"));
        console.log("login "+localStorage.getItem("email"));
        console.log("login "+localStorage.getItem("role"));
        console.log("login "+localStorage.getItem("groups"));
      },
      error=>{
        alert('Error');
      }
    )
  }
}
