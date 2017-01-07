# Exam Questions for period 2

## Why would you consider a Scripting Language as JavaScript as your Backend Platform.
Det kommer selvfølgelig an på hvad der skal laves hvis der skal laves noget CPU intensivt arbejde ville Node ikke passe til opgaven da den arbejder på i enkel tråd. Der hvor Node stråler er ved reeltids applikationer og API. Det er muligt for Node at håndterer mange tusinde requests samtidig ved hjælp af Nodes Event-loop.
En anden fordel er at de fleste kender JavaScript fra front-end så læringskurven for Node er væsentligt lavere og der er et kæmpe community klar til at hjælpe.
Node kan kombineres sammen med en browser og en dokument database som f.eks. MongoDB. Det betyder vi har JavaScript på både server, klient og database.

## Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using for example Java/JAX-RS/Tomcat
**Pros**
- Node er meget letvægts hvilket betyder at serveren starter op lynhurtigt
- Nemt for folk der kender lidt JavaScript i forvejen
- Lav læringkurve
- Er hurtigere

**Cons**

## Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.
Vi kan gøre brug af Nodes ```cluster``` modul som bygger oven på ```child_processes``` modulet, til at tage brug af en multi kerne processor.
Dette gøres ved at gøre brug af ```child_processes``` ```fork()``` metode.
Node vil så have en master process og man kan så oprette workers som snakker sammen med master processen

Et eksempel kunne være
```javascript
var cluster = require('cluster');
var http = require('http');
var numCPUs = 4;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('process ' + process.pid + ' says hello!');
    }).listen(8000);
}
```
Når der lander et request vil node tilføje disse requests til workers en ad gangen. Hvis en worker er ledig vil processen gå igang med det samme, ellers vil det blive tilføjet til en kø.

Dette eksempel har nogle forbedringsmuligheder. Der er bl.a. ikke defineret noget for hvis en worker stopper med at virke, det kan resulterer i at der kun er en master tilbage.
Der er også blevet hårdkodet et antal af CPU'er dette ville selvfølgelig være meget bedre at tjekke automatisk med hjælp fra ```require('os').cpus().length;```.

Et eksempel på en express implementation til en webservice kunne være.
```javascript
var cluster = require('cluster');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        cluster.fork();
    });
} else {
    var app = require('express')();
    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

    var server = app.listen(8000, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}
```

Her tjekker vi om det er en master process og hvis det er det løber antallet af tilgængelige workers igennem og starter den op.
Vi tager ligeledes og lytter på en ```exit``` event hvis nu at en worker stopper så vi kan starte den op igen.
Hvis det er en worker process så starter vi en Express Server op og starter med at lytte på indgående kald.

## Explain, using relevant examples, concepts related to the testing a REST-API using Node/JavaScript + relevant packages
For at teste et REST-API ved brug Node/JavaScript vil vi i her gøre brug af Mocha og Chai.

Vi kan tage udgangspunkt i en af opgaverne
https://github.com/MatsKruger/Mean.2.Period/tree/master/test/3%20Test%20a%20Rest%20API

## Explain, using relevant examples, the Express concept; middleware.
En Express applikation er i bund og grund en serie af middleware funktioner. Middleware funktioner er funktioner der har adgangs til request og response objektet samt den næste middleware funktion. Middleware har adgang til at kører alt kode, ændre på request og response objekterne, afslutte request/respons og eksekvere den næste middleware funktion ved hjælp af ```next```.

Der er 3 forskellige slags middleware
1. Application-level middleware ```use```, ```get```...
2. Router-level middleware ```use```, ```get```...
3. Error-handling middleware
4. Built-in middleware
5. Third-party middleware f.eks. ```bodyparser()```


## Explain, using relevant examples, how to implement sessions, and the legal implications of doing this.
## Compare the express strategy toward (server side) templating with the one you used with Java on second semester.
## Explain, using a relevant examples, your strategy for implementing a REST-API with Node/Express and show
## how you can "test" all the four CRUD operations programmatically using for example the Request package.
## Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
## Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
