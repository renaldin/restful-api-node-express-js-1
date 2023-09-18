# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Renaldi",
  "lastName": "Noviandi",
  "email": "renaldi@gmail.com",
  "phone": "0892398394234"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Renaldi",
    "lastName": "Noviandi",
    "email": "renaldi@gmail.com",
    "phone": "0892398394234"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Renaldi",
  "lastName": "Noviandi",
  "email": "renaldi@gmail.com",
  "phone": "0892398394234"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Renaldi",
    "lastName": "Noviandi",
    "email": "renaldi@gmail.com",
    "phone": "0892398394234"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Renaldi",
    "lastName": "Noviandi",
    "email": "renaldi@gmail.com",
    "phone": "0892398394234"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by firstName or lastName, using like query, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": {
    {
      "id": 1,
      "firstName": "Renaldi",
      "lastName": "Noviandi",
      "email": "renaldi@gmail.com",
      "phone": "0892398394234"
    },
    {
      "id": 2,
      "firstName": "Renaldi",
      "lastName": "Noviandi",
      "email": "renaldi@gmail.com",
      "phone": "0892398394234"
    }
  },
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```
