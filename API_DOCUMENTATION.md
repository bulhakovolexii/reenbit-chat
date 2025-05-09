# Chat Application API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication Endpoints

### Sign Up

```http
POST /auth/signup
```

Create a new user account and automatically create 3 default chat rooms.

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string" // min 6 characters
}
```

**Response:** `201 Created`

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

### Login

```http
POST /auth/login
```

Authenticate a user and receive a JWT token.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

### Logout

```http
POST /auth/logout
```

Invalidate the current session.

**Response:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

### Check Auth Status

```http
GET /auth/check
```

Verify current authentication status.

**Response:** `200 OK`

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string"
}
```

## Chat Endpoints

### Get All Chats

```http
GET /chats
```

Retrieve all chats for the authenticated user.

**Response:** `200 OK`

```json
[
  {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "userId": "string",
    "avatarUrl": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### Create Chat

```http
POST /chats
```

Create a new chat room.

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string"
}
```

**Response:** `200 OK`

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "userId": "string",
  "avatarUrl": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Update Chat

```http
PUT /chats/:chatId
```

Update chat room details.

**Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string"
}
```

**Response:** `200 OK`

```json
{
  "_id": "string",
  "firstName": "string",
  "lastName": "string",
  "userId": "string",
  "avatarUrl": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Delete Chat

```http
DELETE /chats/:chatId
```

Delete a chat room and all its messages.

**Response:** `200 OK`

```json
{
  "message": "Chat deleted"
}
```

## Message Endpoints

### Get Messages

```http
GET /messages/:chatId
```

Retrieve all messages for a specific chat.

**Response:** `200 OK`

```json
[
  {
    "_id": "string",
    "chatId": "string",
    "userId": "string",
    "text": "string",
    "isBot": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### Get Last Message

// TODO

### Send Message

```http
POST /messages/:chatId
```

Send a message in a chat. Automatically triggers a bot response after 3 seconds.

**Request Body:**

```json
{
  "text": "string"
}
```

**Response:** `201 Created`

```json
{
  "_id": "string",
  "chatId": "string",
  "userId": "string",
  "text": "string",
  "isBot": false,
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Update Message

```http
PUT /messages/:chatId/:messageId
```

Update a message's content.

**Request Body:**

```json
{
  "text": "string"
}
```

**Response:** `200 OK`

```json
{
  "_id": "string",
  "chatId": "string",
  "userId": "string",
  "text": "string",
  "isBot": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Delete Message

```http
DELETE /messages/:chatId/:messageId
```

Delete a specific message.

**Response:** `200 OK`

```json
{
  "message": "Message deleted"
}
```

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `404 Not Found`: Requested resource not found
- `500 Internal Server Error`: Server-side error

## Authentication

All endpoints except `/auth/login` and `/auth/signup` require authentication using JWT token in cookies.
The token is automatically set after successful login/signup and removed on logout.
