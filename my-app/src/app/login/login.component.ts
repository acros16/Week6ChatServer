import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from "@angular/router";
import { FormsModule } from '.../../node_modules/@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';

  constructor(socketService:SocketService, private router:Router, private form:FormsModule){}

  ngOnInit(){
  }
  loginUser(event){
    event.preventDefault();

    this.router.navigateByUrl('/chat');
    console.log("testing if dom is ready");
    if (typeof(Storage) !== "undefined"){
      console.log("Storage ready");
      localStorage.setItem("username", this.username);
      console.log(localStorage.getItem("username"));
    }
   
  }
}
