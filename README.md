# Documentacion

Este archivo tiene como finalidad documentar todo lo relacionado a el diseño,
estructura y arquitectura de la aplicacion web (Ecommerce) de Tejipaz

## Archivos iniciales

- ### backend

  En esta carpeta esta todo el proyecto del lado del servidor, creado con Nestjs

  <a href='https://docs.nestjs.com/' style='margin:0 auto;'>

  <img src="https://docs.nestjs.com/assets/logo-small-gradient.svg" alt='react' style="width:3rem;"/>

  </a>

- ### frontend

  En esta carpeta esta todo el proyecto del lado del cliente, creado con Nextjs

  <a href='https://es.react.dev/' style='width:fit; margin:0 auto;'>

  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt='react' style="width:3rem;"/>

  </a>

- ### schema.db.json

  En este archivo se encuentra todo el diseño de la base de datos.

## Diagrama de DB

<img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" style="width:8rem;"/>

```ts
{
    "Roles": {
        "_id": "mongo_id",
        "name": "string"
    },
    "Credentials": {
        "_id": "mongo_id",
        "username": "string",
        "password": "string",
        "role": "role_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    },
    "Employees": {
        "_id": "mongo_id",
        "credential_id": "mongo_id",
        "name": "string",
        "email": "string",
        "phone": "string"
    },
    "Users": {
        "_id": "mongo_id",
        "credential_id": "mongo_id",
        "name": "string",
        "email": "string",
        "countryCode": "string",
        "phone": "string",
        "address": "string",
        "country": "string",
        "city": "string"
    },
    "Categories": {
        "_id": "mongo_id",
        "name": "string"
    },
    "Tags": {
        "_id": "mongo_id",
        "name": "string",
        "color": "string",
        "available": "boolean"
    },
    "Products": {
        "_id": "mongo_id",
        "name": "string",
        "images": ["string"],
        "slug": "string",
        "tags": ["mongo_id"],
        "categories": ["mongo_id"],
        "price": "number",
        "discount": {
            "type": "mongo_id",
            "value": "number"
        },
        "stock": "number",
        "description": "string",
        "available": "boolean",
        "updatedAt": "timestamp",
        "createdAt": "timestamp"
    },
    "Payments": {
        "_id": "mongo_id",
        "user_id": "mongo_id",
        "transaction_id": "string",
        "mount": "number",
        "status": "pending|reject|approved",
        "payment_commitment": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    },
    "Orders": {
        "_id": "mongo_id",
        "payment_id": "mongo_id",
        "items": [
            {
                "product_id": "mongo_id",
                "cant": "number",
                "unitPrice": "number",
                "taxes": "number"
            }
        ],
        "status": "progress|delivered",
        "country": "string",
        "city": "string",
        "countryCode": "string",
        "phone": "string",
        "address": "string",
        "description": "string"
    },
    "Logs": {
        "_id": "mongo_id",
        "user_id": "mongo_id",
        "role_id": "mongo_id",
        "detail": "string",
        "result": "string",
        "createdAt": "timestamp"
    }
}
```

---

## Enviroments (.env)

Variables de entorno necesarias para el buen funcionamiento de la aplicación.

- ### Backend
  - _JWT_SECRET_
  - _DB_URI_
  - _USER_DB_
  - _PASSWORD_DB_
  - _GOOGLE_OAUTH_API_KEY_
  - _GOOGLE_OAUTH_API_SECRET_
  - _GOOGLE_EMAIL_API_SECRET_
  - _CLOUDINARY_API_KEY_
  - _STRIPE_API_KEY_
  - _EFFI_API_KEY_

- ### Frontend
  - _API_URL_

> **Nota:** Adaptarlo segun al entorno donde se encuentre cada servicio.
