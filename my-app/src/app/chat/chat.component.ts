import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';
import { RegService } from '../services/reg/reg.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username: string;
  email: string;
  role: string;
  newuser: string;
  newemail: string;
  newrole: string;
  obj;
  groups = [];
  messages = [];
  message = '';
  connection;
  agroup;
  Alpha: boolean = false;
  Beta: boolean = false;
  Charlie: boolean = false;

  constructor(private sockServ: SocketService, private router: Router, private regServ : RegService) { }

  ngOnInit() {
    //Check for valid user and subscribe to service (chat message)
    if(!localStorage.getItem('username')){
      //No valid session is available
      console.log("Not validated");
      localStorage.clear();
      alert("Not a valid user");
      this.router.navigateByUrl('login');
    }
    else{
      //We have a valid username. Subscribe to Chat service and add chat message
      //to the message array each time you are pushed a message from the server.
      this.username = localStorage.getItem('username');
      this.email = localStorage.getItem('email');
      this.role = localStorage.getItem('role');
      this.obj = JSON.parse(localStorage.getItem('groups')); // Adding groupnames to groups array
      for (let i=0; i<this.obj.length; i++){
        this.groups.push(this.obj[i].groupname);
        console.log(this.groups[i]);
      }
      this.agroup = this.groups[0];
      console.log("Session started for: "+this.username);
      this.connection = this.sockServ.getMessages().subscribe(message=>{
        this.messages.push(message);
        this.message = '';
      });
    }
  }
  sendMessage(){
    //Send a chat message back to the server.
    console.log("message: "+this.message);
    this.sockServ.sendMessage("["+this.username+"]\t"+this.message);
    //this.message = '';
  }

  addUser(){
    //Function to add a new user to authdata.json
    console.log("Adding user "+this.newuser);
    this.regServ.addUser(this.newuser,this.newrole,this.newemail).subscribe(
      data=>{
        localStorage.setItem('newuser',data['username']);
        console.log("Added user "+localStorage.getItem('newuser'));
        this.newuser = '';
        this.newrole = '';
        this.newemail = '';
      },
      error=>{
        alert("Error");
      }  
    );
  }

  changeAlpha(){
    this.Beta = false;
    this.Charlie = false;
    this.Alpha = true;
  }

  changeBeta(){
    this.Alpha = false;
    this.Charlie = false;
    this.Beta = true;
  }

  changeCharlie(){
    this.Alpha = false;
    this.Beta = false;
    this.Charlie = true;
  }

  ngOnDestroy() {
    //When leaving this component close down the subscription
    if (this.connection){
      this.connection.unsubscribe();
    }
  }

  logout(){
    localStorage.clear();
    console.log("Session cleared");
    this.router.navigateByUrl('login');
  }
}
