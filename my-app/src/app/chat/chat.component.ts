import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  username: string;
  email: string;
  role: string;
  messages = [];
  message = '';
  connection;

  constructor(private sockServ: SocketService, private router: Router) { }

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
      console.log("Session started for: "+this.username);
      this.connection = this.sockServ.getMessages().subscribe(message=>{
        this.messages.push(message);
        this.message = '';
      });
    }
  }
  sendMessage(){
    //Send a chat message back to the server.
    console.log("message: "+this.message); //This executes
    this.sockServ.sendMessage("["+this.username+"]\t"+this.message); //This does nothing
    //this.message = '';
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
