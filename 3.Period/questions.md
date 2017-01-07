# Exam Questions for period 3

## Explain, generally, what is meant by a NoSQL database.

NoSQL er højt ydende, skalerbare, ikke relationelle databaser.

MongoDB:
En NoSQL database er en database som ikke er relationel som f.eks. MySQL.
En NoSQL database er som reelt skemaløst og dynamisk hvilket betyder at alle elementer ikke behøver at have samme felter.
Man lagrer data som objekter i f.eks. JSON eller XML.

## Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.

**Pros**
- Dokument baseret (JSON) gør det nemmere at læse sammenhæng i data da det hele ligger samlet.
- Hastighed da man som reelt kalder efter et dokument med al data i.
- Skemaløst betyder at man hurtigere kan komme igang med udviklingen for i agil udvikling kan data ændres og dette har ikke de store betydninger da det er skemaløst.

**Cons***
- Kan have duplikeret data.
- Kan være svære at opdatere data da det måske skal ændres mange forskellige steder.

## Explain how databases like MongoDB and redis would be classified in the NoSQL world
MongoDB bruger dokumenter til at lagre data dette bliver gjort i et JSON lignende format.
Redis bruger key-value til at lagre data. Dette kan f.eks. være hash, list, map.

## Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB
At persistere data til MongoDB og lave alle tjek på om data er korrekt kan være en svær process. Så ligesom vi har brugt ORM (Object Relational Mapping) i java til at manipulerer med data. Kan vi ligeledes bruge Mongoose (ODM - Object Data Mapping) til både at definerer skemaer og persisterer data til vores MongoDB ved hjælp af indbyggede Mongoose funktioner som ```save```.
Vi kan i et Mongoose skema definere om felter er required og unikke. Så vi kan spare en del boilerplate og tjek kode ved at bruge Mongoose framework.

## Explain, and demonstrate, using relevant examples, the strategy for querying MongoDB (all CRUD operations)
https://github.com/MatsKruger/MEAN.3.Period/blob/master/models/jokes.js

Hvis vi skal finde dokumenter i en MongoDB kan vi:
```javascript
db.users.find() // Finder alle brugere
db.users.find({ age: { $lt: 22 } }) // Finder alle brugere med alderen mindre en 22
db.users.findOne({ username: 'John' }) // Finder en bruger med brugernavn John
```

Hvis vi skal oprette dokumenter i en MongoDB kan vi:
```javascript
db.users.insertOne({ username: 'John', age: 18 }) // Opretter en enkelt bruger
db.users.insertMany([
  { username: "John", age: 18 },
  { username: "Ella", age: 21 }
]) // Opretter flere brugere ved brug af et array
db.users.insert([
  { username: "John", age: 18 },
  { username: "Ella", age: 21 }
]) // Opretter flere brugere ved brug af et array
```

Hvis vi skal opdaterer dokumenter i en MongoDB kan vi:
```javascript
db.users.updateOne({ username: "John", age: 18 }) // Opretter en enkelt bruger
db.users.updateOne(
   { "age": 18 },
   {
     $set: { "age": 19 },
   }
) // Opdaterer den første med alderen 18
db.users.updateMany(
   { "age": 18 },
   {
     $set: { "age": 19 },
   }
) // Opdaterer alle med alderen 18
db.users.update(
   { "age": 18 },
   {
     $set: { "age": 19 },
   }
) // Opdaterer eller erstatter alle med alderen 18
```
Hvis vi skal fjerne dokumenter i en MongoDB kan vi:
```javascript
db.users.remove({ username: "John", age: 18 }) // fjerner en eller flere dokumenter der matcher.
db.users.deleteOne({ "age": 18 }) // fjerner en bruger med alderen 18
db.users.deleteMany({ "age": 18 }) // fjerner alle brugere med alderen 18
```

## Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
Indexes er en måde at form for register som vi kender fra f.eks. de sidste sider i en kogebog. Her tager vi det vigtigste ord som forskellige madvare og indekserer dem så man nemt kan finde hvilke opskrifter der indholder en bestemt fødevare. Hvorimod hvis ikke vi havde denne indeksering var vores eneste mulighed at kigge alle opskrifterne igennem.
I MongoDB kan vi bruge ```ensureIndex``` til at sørge for et felt bliver indekseret.
Jeg har ikke selv brugt disse endnu men har lavet et lille eksempel.
I eksemplet har jeg replikeret nogle adresser fra Dawa API som er Danmarks officielle adresse database.
Jeg vil bruge ```explain("executionStats")``` til at få disse stats ud og se fordelen. Der er ca. 8080 adresser i den lokale kopi.
Jeg vil tage adressens status til at bruge som index.

```javascript
  db.adresser.find({"status": 3}).explain("executionStats")
```
Før indekseringen bruges der 13 millisekunder til at finde 404 resultater og der bliver løbet 8080 dokumenter igennem det vil sige alle.

Efter indekseringen bruges der 1 millisekund til at finde 404 resultater og der er løbet 404 dokumenter igennem.

Så man må sige at der er en klar forbedring. Og jo mere data der eksisterer jo mere tid vil der blive sparet.

## Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere

## Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB

https://github.com/MatsKruger/traverse-api
https://github.com/MatsKruger/MEAN.3.Period/blob/master/models/jokes.js

## Explain the benefits from using Mongoose, and provide an example involving all CRUD operations
https://github.com/MatsKruger/traverse-api

## Explain the benefits from using Mongoose, and demonstrate, using your own code, an example involving all CRUD operations
https://github.com/MatsKruger/traverse-api

## Explain how redis "fits" into the NoSQL world, and provide an example of how you have used it.
Redis bruger key-value til at lagre data. Dette kan f.eks. være hash, list, map.
Har ikke brugt det.

## Explain, using a relevant example, a full MEAN application (the A, can be an ionic application) including relevant test cases to test the REST-API (not on the production database)
