# POC Testing RDS Proxy

## Commands

Install ubuntu [pg-native](https://www.npmjs.com/package/pg-native) libs

```sh
sudo apt-get install libpq-dev g++ make
```

Build and start local

```sh
sam build && sam local start-api
```

Test Node Function

```sh
curl --location --request POST 'http://127.0.0.1:3000/node/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Marcelo",
    "lastName": "Santana",
    "email": "tentativafc@gmail.com"
}'
```

Test Go Function

```sh
curl --location --request POST 'http://127.0.0.1:3000/go/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Marcelo",
    "lastName": "Santana",
    "email": "tentativafc@gmail.com"
}'
```