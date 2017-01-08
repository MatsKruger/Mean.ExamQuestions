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
