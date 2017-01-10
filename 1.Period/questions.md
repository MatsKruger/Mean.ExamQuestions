# Exam Questions for period 1

## Explain and Reflect:
Explain differences between Java and JavaScript. You should include both topics related to the fact that
Java is a compiled language and JavaScript a scripted language, and general differences in language
features.

En af forskellen mellem Java og JavaScript er at JavaScript bliver kørt på klienten altså at den bliver fortolket, hvorimod Java bliver kompileret ned.
Begge sprog er OOP hvilket betyder "Object Oriented Programming".
Et eksempel kunne være hvis man skulle bygge en bil, så skal vi bruge en masse dele. Disse dele kunne f.eks. være en motor denne motor ved vi hvordan ser ud og den kan stå for sig selv.
Ud over det skal der selvfølgelig være et karosseri. Men for at det er en funktionel bil skal vi samle disse dele så det bliver til en hel.
En af de største forskelle er at JavaScript er tekst som bliver fortolket af f.eks. browseren.
Java skal kompileres ned til maskin kode hvorefter denne kode den modtagne computer hvor den så kører programmet.

## Explain the use of: "use strict"
"use strict" definere at JavaScript skal køre i "strict mode"
strict mode sørger for at det ikke er muligt f.eks. at oprette globale variable uden at definere dem.
``` javascript
test = 2 + 2;
```
I overstående eksempel kompilerer JavaScript uden problemer. Den vil tage ```test``` og flytte den til en global variable.
``` javascript
'use strict'
test = 2 + 2;
```
I overstående eksempel kompilerer JavaScript med en fejl. ```test``` er ikke defineret som en variable og vil derfor smide en error.
## Variable/function-Hoisting
Hoisting er hvor at javascript løber koden igennem og finder alle deklarationer og flytter dem op til toppen af det nuværende script eller funktion.
Dette betyder at det er muligt at definerer variabler efter de bliver brugt.

``` javascript
x = 5

elem = document.getElementById("demo")
elem.innerHTML = x

var x
```
Vil efter JavaScript har løbet det igennem se således ud
``` javascript
var x
var elem

x = 5

elem = document.getElementById("demo")
elem.innerHTML = x
```

## this in JavaScript and how it differs from what we know from Java/.net.
I JavaScript referere ```this``` til hvordan funktionen er blevet kaldt. Det betyder at hvis funktionen bliver kaldt direkte er this det ```script``` eller den nærmeste omkransende ```function```. Hvis funktionen bliver kaldt med ```call``` eller bliver sat med ```bind``` kan man ændre ```this```
```javascript
function test(p1) {
	var p2 = 'hello';
  console.log(this)

  return {
  	test2: function() {
    	console.log(this)
    },
    test3: () => console.log(this)
  }
}

var tester = test('world') // Logger this som window

tester.test2(); // Logger this som tester objektet
tester.test2.call(this); // Logger this som window objektet
tester.test2.bind(this)() // Nu bliver test2 i tester sat med window som this objekt
tester.test3(); // Logger this som window objektet
```

## Function Closures and the JavaScript Module Pattern

En Function Closure er hvor man angiver f.eks. en variable inde i en function det betyder at kun indholdet i denne funktion har adgang til indholdet.

```javascript
var test = function() {
	var testvar = 'Hello World!';

  return {
  	getVar: () => testVar
  }
}

var tester = test()
console.log(tester) // giver {getVar: ()} som mulige paramtre til tester.
console.log(tester.testVar) // Returnere undefined fordi at testVar ikke er angivet som en returværdi til test.
console.log(tester.getVar()) // returnerer testVar da lokale funktioner har adgang til private variabler
```

JavaScript Module pattern er et pattern som ved hjælp af Closure kan udgive sig for en modul type det betyder at vi kan lave private funktioner, variabler og undermoduler til dette. Dette er smart bl.a. så man ikke kommer til at bruge de samme variabler til flere forskellige formål, men også at vi gør at vores kode er mere selvstændig.

```javascript
var testModule = (function() {
  var testVar = 'Hello World!'

  return {
    testMethod: () => testVar
  }
})()
```
## Immediately-Invoked Function Expressions (IIFE)
Dette bruges som reelt for ikke at smide for meget i det globale scope. Det betyder også at alt uden for denne ikke kan tilgås

```javascript
(function(){
    var foo = function() {};
    window.onload = foo;
})();
// foo kan ikke tilgås herfra. Den er undefined.
```
## JavaScript Prototyping
Alle JavaScript objekter har en prototype. Prototypen er også et objekt. Alle JavaScript Objekter arver egenskaber og metoder fra deres prototype.
```javascript
function Test() {
  this.testVar = 'HelloWorld'
}
Test.prototype.hasVar = function() {
  return !!this.testVar
}

var tester = new Test();

console.log(tester);
```
## Use the Debugger to explain about the basic "things" all objects inherits from object
Alle objekter i JavaScript nedarver egenskaber og metoder fra ```Object.prototype``` men de kan sagtens blive overskrevet. Som f.eks. ```toString()```. De fleste objekter overskriver denne metode og definerer deres egen.

```javascript
function Person(name = '', age = 0) {
	this.name = name
  this.age = age
}
Person.prototype.toString = function() {
  return `Name: ${this.name} Age: ${this.age}`
}

var test = new Person('John', 33)

console.log(test.toString()) // Name: John Age: 33
```

## User defined Callback Functions
En user defined Callback er en Callback der bliver sendt med som en parameter til en funktion. Dette kunne f.eks. være til en asynkron funktion hvor der skal afventes til noget data er modtaget.

```javascript
var test = function(callback) {

  setTimeout(function() {
    callback();
  }, 200)

}

var tester = test(function() {
  console.log('Timeout er færdig');
})
```
## Explain generally about node.js and NPM.
Node JS er et asynkront event baseret JavaScript motor. Node er bygget til at håndterer mange tilslutninger samtidig. Når Node ikke har noget at foretage sig går den i dvale. I modsætning til andre sprog er Node non-blocking I/O hvilket betyder at systemet aldrig låser. Så man kommer aldrig til at lande i en “dead-lock”.
## Explain about the Event Loop in Node.js
Node JS bruger et event loop til at udfører opgaver. Dette kan beskrives følgende
- Klient sender en forespørgsel til serveren
- Node JS modtager denne forespørgelse og tilføjer den til en kø kendt som “Event Queue”
- Event Loop tjekker om der er noget i køen
- Hvis ikke venter den på at der lander noget det
- Hvis der er noget i køen bliver denne hentet fra køen
- Hvis processen ikke kræver noget IO Blocking så bliver processen eksekveret.
- Hvis processen kræver IO Blocking som f.eks. Database eller File så vil den følge en anden tilgangsform
- Tjekker om der er nogle Tråde ledige i den interne “thread pool”
- Bruger tråden og tilføjer processen til tråden
- Nu står tråden for at kører processen og leverer den tilbage til Event Loopet
- Event loop sender data tilbage til klienten

## Provide examples of user defined reusable modules implemented in Node.js

Genbrugeligt geolocation modul til at finde en bruger nuværende position. Denne kan på et senere tidspunkt udvides med andre funktionaliteter fra Geoloacation API'et.
```javascript
var geolocation = (function() {
	var returnObj = {}
	if ("geolocation" in navigator) {
    returnObj.getLocation = function(callback) {
    	navigator.geolocation.getCurrentPosition(callback)
    }
  }
  return returnObj;
})()

module.exports = geolocation
```

Kan nu bruges ved at importerer filen og definerer den i en variable dette gøres i Node ved hjælp af ```require```
```javascript
var geoloaction = require('./geolocation')
geolocation.getLocation(function(position) {
	console.log(position) // Geoposition objekt
})
```
