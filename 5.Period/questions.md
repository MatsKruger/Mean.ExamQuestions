# Exam Questions for period 5

## Explain the two strategies for improving JavaScript: ES6 (es2005) + ES7, versus Typescript. What does it require to use these technologies: In our backend with Node, in (many different) Browsers.
For at kunne bruge ES2015 og ES7 i nuværende Node miljøer samt browsere kan man gøre brug af forskellige teknologier.
Google har udviklet Traceur Compiler som gør det muligt at bruge ES2015 samt ES.next features og transpilere dem ned til ES5 kode.
Der er også BabelJS som gør det samme som Traceur nemlig transpilere koden ned til en ældre version af JS.

Hvis der f.eks. skal bruge import og export på klienten skal der et mellemled mere ind. Nemlig en form for package manager. Her er der en hel masse som f.eks. browserify, webpack, systemJS og rollup.

## Provide examples and explain the es2005 features: let, arrow functions, this, rest parameters, de-structuring assignments, maps/sets etc.

- ```let``` gør det muligt at deklarere til lokal block, statement eller assignment. Hvorimod ```var``` bliver deklareret globalt eller til nærmeste funktion.
```javascript
// Her vil i være bundet til blokken
for (let i = 0; i < 20; i++) {
  array[i]
}
// Her vil i blive hoisted og kan give nogle problemer hvis man f.eks. har en timeout eller asynkron funktion i loopets body.
for (var i = 0; i < 20; i++) {
  array[i]
}
```
- arrow functions er en måde at skrive korte funktioner som ikke har nogen this, arguments, super, eller new.target reference. De er altid anonyme og egner sig bedst til små funktioner.

```javascript

function Person() {
  this.age = 0
  var that = this

  setInterval(function growUp() {
    this.age++ // referencen vil være window da den ikke vil gå binde sig på det globale objekt.
    that.age++ // Vi kan fikse dette ved at deklarerer this i en variable og refererer til denne istedet.
  }, 1000)

  // Kan også løses med en arrow function
  setInterval(() => {this.age++})

}

var p = new Person()
```
Som vi kan se i eksemplet er det meget simplere at bruge en arrow funktion og vi skal ikke tænke på this referencer.

- Rest parametre kan tage parametre og lave om til et array af parametre ved hjælp af ```...```. Det er også muligt at dekonstruere rest parameters.
```javascript

// Måske et dårligt eksempel men vi tager de første 2 parametre som er dem vi mener er vigtige og alle andre smider vi i et array ved hjælp af rest parameters.
function Person(name, email, ...extras) {}
// Her dekonstruerer vi vores rest parameters.
function PersonD(...[name, email, age]) {}

var pers = new Person('John', 'john@example.com', 20, 'iOS', 'Lasagne')
```

## Explain and demonstrate how es2015 supports modules (import and export) similar to what is offered by NodeJS.
I ES2015 er ```import``` og ```export``` blevet introduceret. Ligesom i Node gør det, det at man kan importere og eksporterer moduler.

```javascript
const Person = function() {}

export default Person
```
Her laver vi en constructor funktion ```Person``` og bruger ```export default``` til at eksporterer ```Person```
```javascript
import Person from './Person'

const pers = new Person()
```
Her importerer vi ```Person``` fra vores person fil og bruger den til at oprette en ny ```Person```.

Det er også muligt at eksporterer flere funktioner fra en fil dette kan gøres på 2 måder.

```javascript
export toJSON = function(obj) {
  return JSON.stringify(obj)
}

export fromJSON = function(json) {
  return JSON.parse(json)
}
```

```javascript
const toJSON = function(obj) {
  return JSON.stringify(obj)
}

const fromJSON = function(json) {
  return JSON.parse(json)
}

export default {
  fromJSON,
  toJSON
}
```

Jeg foretrækker den sidste da hvis det var en stor fil har man en klar beskrivelse af hvad der bliver eksporteret

## Provide an example of ES6 inheritance and reflect over the differences between Inheritance in Java and in ES6.
Classes i JavaScript er en overbygning af JavaScript's prototypal inheritance. Så det er ikke noget nyt det er bare en mere overskuelig måde af bygge inheritance på.

```javascript
class Animal {
	constructor(name) {
  	this.name = name
  }

	speak() {
  	console.log(`${this.name} laver en lyd`)
  }
}

class Cat extends Animal {
	speak() {
  	console.log(`${this.name} miaver`)
  }
}

var an1 = new Animal('BB')
var an2 = new Cat('CC')

an1.speak() // Logger "BB laver en lyd"
an2.speak() // Logger "CC miaver"
```

## Explain about Generators and how to use them to:
* Implement iterables
* Implement blocking with asynchronous calls

Generators er lidt anderledes i forhold til almindelige funktioner. Der er normen at når en funktion bliver kørt bliver den kørt linie for linie inden vi går videre til næste del af koden. I generators kan vi starte og stoppe generatoren som vi har lyst til. Det betyder at en generator kan starte med at kører noget kode og så stoppe sig selv og måske aldrig gå videre. Generators kan stoppe sig selv men de kan ikke starte sig selv igen, det er der andet kode udenfor generatoren der skal.
En generator stopper sig selv ved at bruge ```yield```. ```yield ____``` sender data tilbage klienten og stopper sig selv.
For at starte igen skal kode udenfor generatoren kører ```next()```. Man kan overfører data tilbage til generatoren når man kører ```next(data)``` hvor ```data``` er det indhold du vil sende ind i generatoren.

**Iterator**
```javascript
function *test() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

var t = test()
console.log(t.next()) // { }
console.log(t.next()) // { value: 1, done: false }
console.log(t.next()) // { value: 2, done: false }
console.log(t.next()) // { value: 3, done: false }
console.log(t.next()) // { value: 4, done: false }
console.log(t.next()) // { value: 5, done: false }
console.log(t.next()) // { value: undefined, done: true }
```

**Async**
Til at lave asynkron kode med generatorer kan man bruge ```co``` som er et bibliotek. Men for at give et simpelt eksempel.
```javascript
function promiseFactory(val){
  return new Promise((resolve,reject)=>{
    setTimeout(()=> {
      resolve(val*2);
    })
  },1000);
};
function asyncFunc(url) {
  return promiseFactory(url).then(data => {
    tt.next(data)
  })
}
function *test() {
  let v1 = yield asyncFunc(2);
  let v2 = yield asyncFunc(v1);
  let v3 = yield asyncFunc(v2);
  let res = yield asyncFunc(v3);
  console.log(res);
}
var tt = test();
tt.next()
```

## Explain about promises in ES 6, Typescript, AngularJS including:
* The problems they solve
* Examples to demonstrate how to avoid the "Pyramid of Doom"
* Examples to demonstrate how to execute asynchronous code in serial or parallel

Promises prøver at løse problemet med asynkron kode at man ikke ved hvornår data er færdig. Promises returnere et promise objekt som senere i koden kan lyttes på ved hjælp af ```.then(callback)```, hvor ```callback``` er en funktion. En promise returnere en værdi ved ```resolve``` eller en error med ```reject```.
Brugen af then gør koden meget nemmere at overskue frem for Pyramid of Doom ved brug af ```then``` kan vi nemt separerer vores problemer og fokuserer på løsningen vi skal lave nu.
Det gør det også nemt at håndterer fejl ved hjælp af ```catch```.

Et eksempel på at løse "Pyramid of Doom" kunne være følgende
```javascript
async1
  then(async2).
  then(async3).
  then(async4).
  then(async5).
  catch(errorHandlingForAll);
});
```

Et eksempel på seriel asynkron kode vil være det samme som eksemplet ovenover. At asynkron funktion kører en anden asynkron funktion når den er færdig osv.

Et parallelt forløb kunne være at starte 5 forskellige asynkrone kald samtidig. Hvis nu man skulle bruge alle svarende samtidig ville man kunne gøre brug af ```Promise.all``` som er en en promise du kan give et array af værdier og så bruge ```then``` på til at lytte på om de er færdige.

```javascript
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```

## Explain about TypeScript, how it relates to JavaScript, the major features it offers and what it takes to develop Server and Client side applications with this technology.

TypeScript er et bibliotek som gerne vil gøre JavaScript mere fejlfrit ved hjælp af typer. I TypeScript giver du alle dine variabler, funktioner og attributes typer. Det betyder at jo mere du typificere din kode jo mere lære TypeScript om din kodebase og hjælper dig derudfra med at få din kode mere fejlfri allerede ved kompilerings tid. Det er også muligt at bruge mange ES2015 funktioner i TypeScript.
TypeScript kode skal transpileres ned til almindelig JavaScript dette bliver gjordt med TypeScript server.
Man kan kører transpileringen gennem terminalen/CMD ved brug af ```tsc```. Hertil bruges nogle parametre som definere fil, version output og alt muligt andet. Man kan bruge en ```tsconfig.json``` fil til at definere alle disse.
TypeScript er et lag der ligger oven på JavaScript. Det betyder at man kan tage sin eksisterende kodebase omdøbe en JavaScript fil til TypeScript og den ville så virke som før. Det gør at man stille og roligt kan migrerer over til TypeScript uden at det har betydning for resten af koden.
Nogle af de store features som kommer med TypeScript er
- ```interface``` som er en måde at lave en kontrakt for hvordan et objekt skal se ud.
- Det er typestærkt hvilket betyder at vi kan sørge for at vores kode kører mere flydende uden type fejl.
- Vi kan gøre brug af de nyeste JavaScript standarder (Er dog nogle fejl her og der. bl.a. med default values men det bliver rettet i næste version)

## Provide examples of Interfaces with typescript and explain what is meant by the term duck-typing.
I eksemplet nedenfor laver vi et interface ```IPerson``` hvor vi definerer at en person skal have et ```name```, ```age``` og en optional ```email```.
```javascript
interface IPerson {
  name: string;
  age: number
  email?: string
}

class Person implements IPerson {}
```

Duck typing er en måde hvor fortolkeren er tilfreds hvis et objekt opfylder nogle krav. I eksemplet ovenfor definerer vi at der skal være nogle parametre opfyldt for at kunne oprette objektet. Hvis disse parametre bliver opfyldt er vil fortolkeren være tilfreds og tillade oprettelsen. Det kan beskrives med sætningen "If it looks like a duck and quacks like a duck, it's a duck".

## Provide an example of TypeScript inheritance, involving
* A top-level interface to define the most basic behaviour and types
* The constructor shorthand to automatically create properties
* All of the Access Modifiers public, private and protected (and perhaps also
readonly)
* Abstract
* Static (make a counter than counts the total number of instances)

```javascript
interface IAnimal {
  sound: string;
  name: string;
}


abstract class Animal implements IAnimal {
  constructor(public sound, public name) {
    Animal.count++
  }
  static count: number = 0
  speak() {
    console.log(`${this.name} siger ${this.sound}`)
  }
}

class Dog extends Animal {

  constructor(public name) {
    super("woof", name)
    Dog.count++
  }
}

class Cat extends Animal {

  constructor(public name) {
    super("meow", name)
    Cat.count++
  }
}

const cat1 = new Cat('Freja');
const cat2 = new Cat('Batman');
const cat3 = new Cat('Mikkel');

const dog1 = new Dog('Joey');
const dog2 = new Dog('Buller');
const dog3 = new Dog('King');

cat1.speak()
cat2.speak()
cat3.speak()
dog1.speak()
dog2.speak()
dog3.speak()

console.log(Dog.count)
console.log(Cat.count)
console.log(Animal.count)
```

## Explain TypeScript Generics, the problems they solve, and provide examples of your own generic functions and classes.

## Explain (some) of the purposes with a tool like WebPack, using a simple proof of concept example
Webpack er en ud af mange forskellige module bundlers. Det betyder at man ved hjælp fra Webpack kan få bundled sine filer sammen til en eller flere filer. I Webpack kan man f.eks. gøre brug af ES2015 modules til at separerer sin kode ud i mindre blokke.
Webpack har også mulighed for at bundle css og billeder. I Webpack bruger man loaders til at bundle og kompilere kode. Dette gøres ved hjælp af ```webpack.config.js``` heri definerer man alle indstillinger og opsætninger til Webpack.
