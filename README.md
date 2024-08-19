![](https://www.teguharief.com/img/teguh-arief.png)

# Mini Bank

Build a RESTful API using Node.js, Fastify, Prisma, TypeScript, PostgreSQL with Swagger for a mini bank.

## Dockerize

```
git clone git@github.com:teguharifudin/Mini-Bank.git
```
```
cd Mini-Bank
```
```
docker-compose build
```
```
docker-compose up
```

## Usage

Then run the app at http://localhost:3000/docs

### POST /users/

User A
```
{   
  "name": "Teguh",
  "email": "teguh@gmail.com",
  "password": "@Pass123",
  "amount": "10000"
}
```
User B
```
{   
  "name": "Arief",
  "email": "arief@gmail.com",
  "password": "@Pass123",
  "amount": "5000"
}
```

### POST /users/login

User A
```
{   
  "email": "teguh@gmail.com",
  "password": "@Pass123"
}
```

### GET /users/

### GET /users/me

### POST /send/

User A to User B
```
{   
    "toAddress": "arief@gmail.com",
    "amount": 2500,
    "currency": "USD"
}
```

### POST /withdraw/

User A
```
{   
    "toAddress": "teguh@gmail.com",
    "amount": 500,
    "currency": "USD"
}
```

### GET /transactions/

### GET /transactions/me

## Contributing

Please use the [issue tracker](https://github.com/teguharifudin/Mini-Bank/issues) to report any bugs or file feature requests.
