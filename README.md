# Assignment Chat Server
Angular chat server project. 2811ICT Web Programming.
# Git repository organisation
This git repository was organised in a way such that any additions to the code would be easily comitted and not cause any conflicts. This was done by simply keeping the Angular folder in tact, and uploading it to GitHub as a whole. This allows for consistency in directories and files between both the repository available on a user's computer and the origin.
# Data Structures
The data for all users and their groups was stored in the same .JSON file "authdata.JSON". This allowed for a more cohesive data structure to represent all of the information required for a single user in one file. Each element contained a username, role, email and an array of groupnames. This secondary data strucuture within the primary authdata.JSON allows the user's usernames to be easily associated with their respective groups, which is very helpful when developing and implemented the code for this project.
# Client / Server Responsibilities
Both the client and server have several functions executing, allowing them to share the workload of running the chat room. The server primarily focuses on the initial startup, routing, socket processes and both auth and reg functions. The server also contains the authdata.JSON file which contains all the user data, as it would be unwise to have such information on the client side. The client focuses on displaying all relevant information to the user that is received from the server, and taking in input to give to the server. It also contains the socket, auth and reg services, which effectively communicate with the server with the HttpClient and Socket.io modules.
# Routes / Parameters / Returns / Purpose
app.route('/api/auth') - This route takes in just a username as a string. It is used to route the username given my the user to the server and retrieve that user's data from the .JSON file. It returns back the full element that exists in the authdata.JSON file, with all information available for that username.

app.route('/api/reg') - This route takes in a username, role and email as strings. It is used to add a new user to the .JSON file. It assigns the user to the default group along with their input username, role and email. It returns back the username if successful.
# Angular Architecture - Components / Services / Modules / Routes
Components:

Chat - This is the primarily component for the chat room service. It presents valid users with all their current information such as their email, role and groups. It presents the user with a variety of buttons depending on their role that allow them to send messages, join different groups and add users (depending on their role). This component uses the reg.service and socket.service.

Login - This component allows the chat room to recognize if they are an existing user or not. Although proper authentication is not implemented yet (as it is still Assignment 1). Once a user has logged in, they are routed to the chat component immediately. This component uses the auth.service.

App - This component is the default route users will be lead to when they connect to localhost:3000. It contains the chatroom title and a link to the chat component and login component. This component remains visible even when accessing other components to maintain easy navigation.

Services:
Auth - This service allows users to access their data based on their username. It is called by the login component to store all that information in local storage.
Reg - This service allows Super Admins and Group Admins to create new users by inputing a new username, role and email. The new uiser's group is set to the default.  It is called by the chat component.
Socket - Although not required for assignment 1, this service allows users to communicate with each other in the chat room by routing their messages through sockets and displaying existing messages by feeding data to components with the subscribe function. It is called by the chat component.

Modules:
The app.module.ts contains the AppComponent, LoginComponent and ChatComponent. It also imports the BrowserModule, FormsModule and HttpClientModule for use in its various components. It also calls the RouterModule to set express routes to the Login and Chat components. It also calls the HttpClientModule, SocketService, AuthService and RegService as providers. 

This project uses NPM installs of socket.io, path and express.
