# Exam Questions for period 6

## Name attributes of HTTP protocol makes it difficult to use for real time systems.
- Request → Response
  Jeg beder serveren om noget og den levere.
- Half duplex
  Er hvor der er tovejs forbindelse med kun en forbindele kan sende data ad gangen.
- Stateless
  Betyder at hvert request bliver behandlet som unikt.
- Big overhead (HTTP headers, cookies)

## Explain polling and long-polling strategies, their pros and cons.

- **Pooling** er når man sender et request afsted med et reelmæssigt mellemrum. Dette er godt til ting hvor man kender tidsrummet for hvornår en opdatering lander. F.eks. applikation som udgiver data en gang i døgnet. Denne egner sig ikke til løsninger som chat klienter hvor man ikke kender intervallet.
- **Long-pooling** er hvor der bliver sendt et request til serveren og serveren så holder denne request åben i en defineret periode. Når der så kommer nu data sender serveren data'en tilbage til kalderen. Det gode her er vi får nyeste data med det samme. Det dårlige er at vi kan ende i et uendeligt loop.

## What is WebSocket protocol, how is it different from HTTP communication, what advantages it has over HTTP?
WebSocket protocol er en en protokol der gør det muligt at lave bidirektionel kommunikation mellem klint og server. Protokollen bliver instantieret under første kontakt mellem klient og server over TCP forbinelse. Når dette er gjordt og godkendt begynder data at bliver overført mellem klient og server. Da det er bidirektionelt kan data komme begge veje fra.
**Fordele**
- full-dublex: kontakt begge veje samtidig.
- Ingen HTTP overhead: Mindre data skal sendes frem og tilbage

## Explain what the WebSocket Protocol brings to the Web-world.
WebSocket protokollen gør det som har været svært at opnå tidligere nemlig reeltids applikationer som f.eks. chat. Det gør det muligt at undvære andre frameworks som Java og kan kører direkte på åbne standarder i browseren.

## Explain and demonstrate, using a package like Socket.io (on the Server), the process of WebSocket communication - From connecting client to server, through sending messages, to closing connection:
- On the client
- On the server

**Server**
```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

**Klient**
```html
<script src="/socket.io/socket.io.js"></script>
```
```javascript
  var socket = io();
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.emit('chat message', 'Hello World');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });

  });
```

## What's the advantage of using libraries like Socket.IO, Sock.JS, WS, over pure WebSocket libraries in the backend and standard APIs on frontend? Which problems do they solve?
Jeg tager udgangspunkt i socket.io

Disse biblioteker gør det nemmere at opsætte WebSockets og har "feature detection" indbygget som gør at hvis browseren ikke understøtter WebSockets laver den en fallback til long-polling.
