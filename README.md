# Mono API Server
> https://monoapp.io

## Installation

> Built with express, mongodb, and mongoose. Requires Node 8+_

- Clone repository
- Install dependencies (`yarn`)
- Run MongoDB (`mongod` or `brew services start mongo`)
- Run the application (`yarn start`)

## Documentation

This API uses stateless JWT authentication. Once a user logs in, the successful response will contain the `token` in the body. That token will expire in 24 hours. Every request will generate a new token that will last 24 hours from the time of the request, so make sure to replace the token in local storage after every request. To logout, simply remove the token from local storage.

Attach that token to any requests that require authentication by setting it as the value for the `x-access-token` header field.

### Models

- `*` = required, cannot be null
- `^` = validated, through the ORM

#### [User](/api/models/user.js)

##### Attributes

- `name`: String*
- `email`: String*^
- `password`: String* (hashed)

##### Virtuals

##### Associations

### Routes

- `*` = returns a JWT auth token
- `^` = authentication required

#### [POST /signup*](/api/controllers/user-controller.js)

Registration route. Returns the new user.

##### Sample Body

```
{
  name: "Andre Neves",
  email: "andre@neves.com",
  password: "asdfasdf"
}
```

##### Successful Response

```
{
  "message": "Successfully created user",
  "data": {
    "id": 45114006-cde6-450d-a1ec-04765401bd75,
    "name": "Andre",
    "email": "andre@neves.com",
    "updatedAt": "2018-04-17T20:42:14.054Z",
    "createdAt": "2018-04-17T20:42:14.054Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTUyMzk5NzczNCwiZXhwIjoxNTI0MDg0MTM0fQ.SXTDc9hrbc7R3qEkfParG-kwM-73iOQOjyF6KHsa2A8"
}
```

#### [POST /login*](/api/controllers/user-controller.js)

Re-authentication route. Returns the logged in user.

##### Sample Body

```
{
  email: "andre@neves.com",
  password: "asdfasdf"
}
```

##### Successful Response

```
{
  "message": "Successfully logged in user",
  "data": {
    "id": 45114006-cde6-450d-a1ec-04765401bd75,
    "name": "Andre",
    "email": "andre@neves.com",
    "updatedAt": "2018-04-17T20:42:14.054Z",
    "createdAt": "2018-04-17T20:42:14.054Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTUyMzk5NzczNCwiZXhwIjoxNTI0MDg0MTM0fQ.SXTDc9hrbc7R3qEkfParG-kwM-73iOQOjyF6KHsa2A8"
}
```

#### [GET /me*^](/api/controllers/me-controller.js)

Return logged in user identified in token.

##### Successful Response

```
{
  "message": "Successfully retrieved logged in user",
  "data": {
    "id": 45114006-cde6-450d-a1ec-04765401bd75,
    "email": "andre@neves.com",
    "name": "Andre",
    "updatedAt": "2018-04-17T20:42:14.054Z",
    "createdAt": "2018-04-17T20:42:14.054Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTUyMzk5NzczNCwiZXhwIjoxNTI0MDg0MTM0fQ.SXTDc9hrbc7R3qEkfParG-kwM-73iOQOjyF6KHsa2A8"
}
```

##### Error Response

```
{
  "message": "Invalid email/password",
  "error": "Invalid email/password"
}
```

#### Sample Errors

##### Authentication Errors

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

##### Validation Errors

```
{
  "message": "Error creating user",
  "error": {
    "code": 11000,
    "index": 0,
    "errmsg": "E11000 duplicate key error collection: admin.users index: email_1 dup key: { : \"jake3@bighuman.com\" }",
    "op": {
      "_id": "5ad79709f8caa627a4a0e1ca",
      "name": "Andre",
      "email": "andre@neves.com",
      "password": "$2a$10$2RZ4Nr8TQ5wl3E7ff1viPOxmd/ui1fZan0mEvNH9Duoy44/ZicteO",
      "__v": 0
    }
  }
}
```
