# CAH - Cards Against Humanity 

### Table of Contents
1. [ About the game. ](#about)
2. [ Technologies used. ](#tech)
3. [ Installation. ](#install)
4. [ How the app works. ](#work)
5. [ Development. ](#dev)

<a name="about"></a>
### About the game
***
This is an __unofficial__, web based <a href="https://www.cardsagainsthumanity.com/">Cards Against Humanity</a> party game. It's all about choosing the most silly answers to even more ridiculous questions in a card-game format. \
__Check it out live here__: *https://cards-against-humanity-client.herokuapp.com* \* \
Just register, then log in with the data provided during the registration process. \
Enjoy!

\* It might take a few longer seconds to connect. Don't worry, that's probably because the server has gone to sleep. It will wake up as soon as you connect to it.

<a id="tech"></a>
### Technologies
***
Technologies used in the project includes:
- NodeJS
- ReactJS
- MongoDB
- WebSockets
- Express
- JSON RPC - as the method of communication between a client and server


<a name="install"></a>
### Installation
***
##### Development version
If you wish to contribute to the project or to run the app locally, follow the steps below.

###### Prerequisites
1. Installed MongoDB.  If you don't have it installed yet, you could follow this tutorial: https://docs.mongodb.com/manual/installation/
2. Installed NodeJS.  If you don't have it installed yet, you could follow this tutorial: https://nodejs.org/en/download/

###### Installation 
1. Clone this repository: ```git clone https://github.com/jakub-galecki/CAH.git ```
2. Run MongoDB (on linux with following command: ``` sudo systemctl run mongodb``` )
3. Go to MongoDB (on linux with command ``` mongo ```) shell and run the commands below:
```
   use CAH;
   db.createCollection('users');
   db.createCollection('rooms');
   db.createCollection('cards');
   db.createCollection('decks');
```
4. Close the shell and navigate to folder where you have cloned the repository.
5. Go to directories *client* and *server* and run  ``` npm install``` command in both of them.
6. If the installation has proceeded without any errors, you can run following commands:
- In *server* directory - ``` node index.js ```
- Open new terminal navigate to *client* directory and run ``` npm run start ```
7. The app should run in your default browser. 
8. If you make any changes in the source code, you should repeat the steps above.

*In case of any errors during the installation process please contact
the owner of the repository or the contributors.* 

<a name="work"></a>
### How the app works
***

This project is using JSP RPC protocol to communicate with the server. In this section
we will explain how it works.   

To communicate with server client uses something called request object. There are specific members of the object
that have to be included in the structure of the request object, these are:
- json rpc, which specifies the version of the JSON-RPC (project is using version 2.0).
- method, which specifies method that will be invoked on a server.
- params, values that will be used by the invoked method.
- id, not always required, but in this project we include this member.


So the structure of request object will look like the structure below:
```json 
{
  "jsonrpc":"2.0",
  "method":"someMethod",
  "params":
    {
        "somekey": "Some Value"
    },
  "id": 1
}
```

After sending the request, client waits for the response object that has the same id member
as the request object. Response object will be structured in the following way:
```json 
{
  "jsonrpc":"2.0",
  "result":
    {
        "somekey": "Some Result"
    },
  "id": 1
}
```

Or if the error occurred:

```json 
{
  "jsonrpc":"2.0",
  "error": "Error Message",
  "id": 1
}
```

*For more information please visit the official website of the json rpc - https://www.jsonrpc.org/specification*

<a name="dev"></a>
### Development
***

Important methods:


- *localhost:8080/user/createUser*
```
Method: POST 
Body:
{
    "username" : "test",
    "password" : "test",
    "played" : 0,
    "won" : 0
}
```
- *localhost:8080/user/login*
```
Method: POST 
Body:
{
    "username" : "test",
    "password" : "test"
}
```
If you want to develop the app, you should connect following URLs:
1. For websockets: ws://localhost:8080/token=*\<token received after logging in or creating new user>*
2. For http requests: http://localhost:8080.

We use the JSON-RPC protocol only for websockets.
