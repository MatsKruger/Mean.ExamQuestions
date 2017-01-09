# Exam Questions for period 7

## Explain basic security terms like authentication, authorization, confidentiality, integrity, SSL/TLS and provide examples of how you have used them.
- **Authentication** er at bekræfte en klient ved hjælp af en login procedure. F.eks. facebook login.
- **Authorization** er at tjekke om en godkendt klient har adgang til servicen.
- **Confidentiality** er beskyttelse af videregivelse til klienter der ikke er godkendt.
- **Integrity** sikrer at data er ens og ikke kan ændres.
- **SSL/TLS** er en kryptografi protocol som sikrer klienter i transaktionen mellem klient og server.

**Eksempel**
https://github.com/MatsKruger/traverse-api

## Explain, at a fundamental level, the technologies involved, and the steps required, to setup a SSL connection between a browser and a server, and how to use SSL in a secure way.
For at sætte en SSL connection op mellem browseren og servere. Skal vi bruge certifikat. Vi kan selv lave dette certifikat "self signed certificate" eller få lavet et hos en Authority som f.eks. let's encrypt.
et certifikat gør brug af public/private key encryption. Public/private key encryption er hvor en computer har en private og en public key. Public key bliver så sendt over til en anden computer denne computer bruger så public key til at krypterer data hvorefter data bliver sendt tilbage til afsender computeren. Afsender computeren bruger så private key til at dekryptere data. Med public/private key encryption er det kun private key der kan dekryptere data.

## How can we "prevent" third party code used, by either our Java or NodeJS applications, from injecting dangerous code into our code base?
Man skal som udgangspunkt altid overveje hvilke pakker man egentligt har brug for. Det er jo ikke altid sikkert at man netop har brug for denne pakke. Og en pakke kan måske have afhængigheder af andre pakker som også kan have afhængigheder.
ExpressJS anbefaler at man bruger ```nsp``` (Node Security Project) til at tjekke for sikkerhed i de pakker man bruger.

## Explain about Node tools like Helmet and nsp (and the Node Security Project). What do they do, and how have you used them.

**Helmet** er et stykke ExpressJS Middleware som inkluderer en masse andre middlewares. Disse middlewares sætter http headers som gør appen mere sikker mod bl.a. XSS (cross site scripting), CSP (Content Security Policy), Frame Options.

```javascript
var express = require('express')
var helmet = require('helmet')

var app = express()

app.use(helmet())
```

**nsp (Node Security Project)**  er en pakke man kan bruge til at tjekke for mulige sårbarheder i npm pakkerne man bruger.

```javascript
nsp check --output checkstyle
```

## Explain basic security threads like: Cross Site Scripting (XSS), SQL Injection and whether something similar to SQL injection is possible with NoSQL databases like MongoDB, and DOS-attacks. Explain/demonstrate ways to cope with these problems, preferably via your suggestion for a seed.

- XSS er en form for injection, hvor et skadeligt script kan sende data fra browseren tilbage til personen som har sendt den skadelige script ind.
Man kan beskytte sig på flere måder men en af de bedste er at få encoded det data som bliver sendt til serveren så dette ikke ser ud til at være kode og på den måde ikke bliver kørt i browseren.

- SQL Injection er hvor man sender noget en SQL kommando med over som til SQL databasen. Denne SQL kommando bliver sat som en parameter til SQL strengen og når SQL Databasen så ser den tror "nå det her er en kommando den må jeg hellere kører."
For at sikrer os mod SQL Injections skal vi også gøre brug af escapes og også sørge for at vi trimmer at væk som ikke minder om det vi ønsker at sende over.
Vi skal ligeledes gøre brug af prepared statements og aldrig indsætte parametrene direkte ind i vores SQL statement (placeholders).
```javascript
SELECT * FROM Users WHERE Name ="" or ""="" AND Pass ="" or ""=""
```
MongoDB har ligelede problemer vi kan f.eks. gøre brug af lad os sige login eksempel. Her vil vi bruge username og password felter til at overfører MongoDB ```$gt``` til at evaluerer til true og dermed omgå login.

```javascript
{
    "username": {"$gt": ""},
    "password": {"$gt": ""}
}
```
Hvis vi ikke escaper dette vil det blive ført over, tjekke om usersame er større en 0 hvilket vil returnere true. Det samme for password. Hvilket resulterer i at vi har omgået login. Så der er altid vigtigt at få escape sit data.

## Explain and demonstrate ways to protect user passwords on our backend, and why this is necessary.

Det er vigtigt at vi beskytter vores brugere passwords da det er deres adgang til personligt materiale. Vi kan beskytte vores brugeres data ved at sørge for at vi kører på en HTTPS forbindelse så den er krypteret. Ligeledes skal vi sørge for at at passworded ikke bliver sendt frem og tilbage ved hver request. Dette kan gøres ved hjælp af JWT (JSON Web Token).
Når vi skal lagrer passwords i vores database skal vi sørge for at Hash og Salt vores password før vi lagrer det på den måde gør vi det umådeligt svært for hackere at bruge passworded til noget hvis de nu skulle få fat i den hashede og saltede streng.
Dette kan gøres i NodeJS på følgende måde.
```javascript
var crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('\nSalt = '+passwordData.salt);
}

saltHashPassword('MYPASSWORD');
saltHashPassword('MYPASSWORD');
```

## Explain about password hashing, salts and the difference between Bcrypt and older (not suited) algorithms like sha1, md5 etc.
- Hashing er hvor man tager en streng og konverterer om til en fælles længde. Hvis en streng er ændret bare lidt vil resultatet af hashen være meget forskellig. Det betyder at man ikke kan regne bogstaver eller rækkefølge ud fra hashen. Men en hash er altid den samme. Så hvis 2 brugere har samme password vil de også have samme hash.
- Salt er en tilfældig streng. Denne streng kan vi tilkoble vores hash og gøre den unik hver gang.
- Bcrypt er et key stretching hash som betyder at serveren er længere tid om at kører hashing funktionen hvilket gør at det ikke er muligt at tjekke flere tusinde passwords i sekundet. Hvor imod sha1 og md5 er hashing funktioner som nemt gør det muligt at lave brute-force attacks.

## Explain about JSON Web Tokens (jwt) and why they are extremely suited for a REST-based API
JSON Web Tokens er en kompakt måde at overfører data mellem parter på en sikker måde.
EN server kan f.eks sende en token til en bruger om at han/hun er logget ind og brugeren kan derefter sende denne token med over for at verificerer at man er den man er.
De er specielt gode fordi det virker i stort set alle sprog. De er stateless. De indeholder alt data i samme pakke. De er signeret.

## Explain and demonstrate a basic NodeJS/Angular seed and how it handles authentication and authorization, prevents against Cross Site Scripting and other basic web-threats.
https://github.com/MatsKruger/MEAN.7.Period
