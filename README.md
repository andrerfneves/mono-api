# mono-api

## Installation

_Built with the BH Node Generator, with express, mongodb, and mongoose. Requires Node 8+_

- Clone repo
- Install dependencies (`npm install`)
- Run mongodb (`mongod` or `brew services start mongo`)
- Run the application (`npm start`)

## Documentation

This API uses stateless JWT authentication. Once a user logs in, the successful response will contain the `token` in the body. That token will expire in 24 hours. Every request will generate a new token that will last 24 hours from the time of the request, so make sure to replace the token in local storage (or wherever) after every request. To logout, simply remove the token from local storage (or wherever).

Attach that token to any requests that require authentication by setting it as the value for the `x-access-token` header field.

### Models

- `*` = required, cannot be null
- `^` = validated, through the ORM

#### [User](/api/models/user.js)

##### attributes

- `firstName`: String*
- `lastName`: String*
- `email`: String*^
- `password`: String* (hashed)

##### virtuals

##### associations

### Routes

- `*` = returns a JWT auth token
- `^` = authentication required

#### [POST /signup*](/api/controllers/user-controller.js)

Registration route. Returns the new user.

##### sample body

```
{
  firstName: "Nakey",
  lastName: "Jakey",
  email: "jakey@example.com",
  password: "asdfasdf"
}
```

##### successful response

```
{
  "message": "Successfully created user",
  "data": {
    "id": 45114006-cde6-450d-a1ec-04765401bd75,
    "firstName": "Nakey",
    "lastName": "Jakey",
    "email": "jakey@example.com",
    "updatedAt": "2018-04-17T20:42:14.054Z",
    "createdAt": "2018-04-17T20:42:14.054Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTUyMzk5NzczNCwiZXhwIjoxNTI0MDg0MTM0fQ.SXTDc9hrbc7R3qEkfParG-kwM-73iOQOjyF6KHsa2A8"
}
```

#### [POST /login*](/api/controllers/user-controller.js)

Re-authentication route. Returns the logged in user.

##### sample body

```
{
  email: "jakey@example.com",
  password: "asdfasdf"
}
```

##### successful response

```
{
  "message": "Successfully logged in user",
  "data": {
    "id": 45114006-cde6-450d-a1ec-04765401bd75,
    "firstName": "Nakey",
    "lastName": "Jakey",
    "email": "jakey@example.com",
    "updatedAt": "2018-04-17T20:42:14.054Z",
    "createdAt": "2018-04-17T20:42:14.054Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTUyMzk5NzczNCwiZXhwIjoxNTI0MDg0MTM0fQ.SXTDc9hrbc7R3qEkfParG-kwM-73iOQOjyF6KHsa2A8"
}
```

#### [GET /me*^](/api/controllers/me-controller.js)

Return logged in user identified in token.

##### successful response

```
{
  "message": "Successfully retrieved logged in user",
  "data": {
    "id": 45114006-cde6-450d-a1ec-04765401bd75,
    "email": "jakey@example.com",
    "firstName": "Nakey",
    "lastName": "Jakey",
    "updatedAt": "2018-04-17T20:42:14.054Z",
    "createdAt": "2018-04-17T20:42:14.054Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTUyMzk5NzczNCwiZXhwIjoxNTI0MDg0MTM0fQ.SXTDc9hrbc7R3qEkfParG-kwM-73iOQOjyF6KHsa2A8"
}
```

##### error response

```
{
  "message": "Invalid email/password",
  "error": "Invalid email/password"
}
```

#### sample errors

##### authentication errors

```
{
  "message": "Failed to authenticate token",
  "error": {
    "name": "JsonWebTokenError",
    "message": "invalid signature"
  }
}
```

```
{
  "message": "No token provided",
  "error": "No token provided"
}
```

##### validation errors

```
{
  "message": "Error creating user",
  "error": {
    "code": 11000,
    "index": 0,
    "errmsg": "E11000 duplicate key error collection: admin.users index: email_1 dup key: { : \"jake3@bighuman.com\" }",
    "op": {
      "_id": "5ad79709f8caa627a4a0e1ca",
      "firstName": "Jake",
      "lastName": "Bent",
      "email": "jake3@bighuman.com",
      "password": "$2a$10$2RZ4Nr8TQ5wl3E7ff1viPOxmd/ui1fZan0mEvNH9Duoy44/ZicteO",
      "__v": 0
    }
  }
}
```
