import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
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
    HttpClientModule,
    RouterModule.forRoot([
      { path:"chat", component:ChatComponent},
      { path:"login", component:LoginComponent},
    ])
  ],
  providers: [HttpClientModule, SocketService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
