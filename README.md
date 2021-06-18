
# Fashion cloud

## Endpoints

https://documenter.getpostman.com/view/5376766/TzeXmTQw

### Key Features


- preview all departments
- preview a single department
- create a new department
- update a department
- delete a department
- search through the departments
- add a few more custom fields to every department.

## Tech Stack

Node.js, Express framework, MongoDB with Mongoose ORM, Bcrypt, Jest, Supertest, Babel

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run start:dev** to start the local server with nodemon
- **npm test** to start server using testing environment

# Back-end

I use Node.js and it's Express framework to build the server and APIs. For the chat app, we use Socket.IO.

- [**Node.js**](https://nodejs.org/en/) is a JavaScript runtime build on Chrome's V8 engine. Being an interface to the V8 JavaScript runtime, it enables super fast JavaScript interpreter that runs in the Chrome browser. Its non-blocking I/O model is ideal for real-time applications, like chats, even tho it is single threaded. Event loop takes care of all the asynchronous I/O operations without blocking synchronous tasks. That means actions like reading or writing to the database, or network requests can be performed very quickly and not block the process.

- [**Express.js**](https://expressjs.com/) is a flexible Node.js framework that provides robust set of features for web and mobile applications. The pleathora of HTTP utility methods and middleware available allows us to quickly create robust API.

## Database

### **MongoDB**

MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License (SSPL).

### **Mongoose**

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

Mongoose is perhaps the most popular and used promised base Javascript MongoDB ORM.

## APIs query type

### **Rest API**

REST API is a simple and popular architecture type both for client and server-side that helps us perform all CRUD operations. Since REST was covered in the curriculum and also effectively solves our problem in the early circle we would be starting with it.

## Testing

### **Jest Framework**

Jest is a testing framework that focuses on simplicity. It was covered in the curriculum, have awesome documentation and practically covers every aspect of testing; from unit-test to snap-shot test, etc.

Jest have both units test, snap-shot test and react test. It's also simple and simply delightful.

## **Continous Integration**

Using continuous integration for our test helps us deploy our application dynamically, supports our development process by automatically building and testing code changes, providing immediate feedback on the success of the change.


## Hosting & Environments

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

```
DEVELOPMENT_DB='mongodb://localhost:27017/climendo'
PORT=7000
TEST_DB = 'mongodb://localhost:27017/climendo_TEST'
```

### Errors and Status Codes

If a request fails any validations, expect errors in the following format:

If requests on creating or updating event fails any validations, expect errors in the following format:

```source-json
{
    "status": 422,
    "message": [
        "field": {
            "The n field is required."
        }
    ]
}
```

### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request


