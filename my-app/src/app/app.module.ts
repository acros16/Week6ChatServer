import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SocketService } from './services/socket/socket.service';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule ,
    HttpModule,
    RouterModule.forRoot([
      {path:"chat", component:ChatComponent},
      { path:"login", component:LoginComponent}
    ])
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
