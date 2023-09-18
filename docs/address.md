# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postalCode": "Kode pos"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postalCode": "Kode pos"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## GET Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Sucess :

```json
{
  "data": {
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postalCode": "Kode pos"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postalCode": "Kode pos"
    }
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Response Body Sucess :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Address is not found"
}
```
