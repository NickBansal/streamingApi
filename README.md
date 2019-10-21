# Live streaming API
This API can be used to track a particular user and see how many live streams they are watching. It should show errors if the user is watching more then 3 or less then zero streams.

I have added a folder called testData which emulates a database of users. I have used this to test my work

## Useful links
- [NodeJs](https://nodejs.org/en/)
- [ExpressJs](https://expressjs.com/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://www.npmjs.com/package/supertest)

## Endpoints
There are 4 endpoints I have created.
- /api/
    
    This end point will allow you to view every user and the amount of streams they are watching

- /api/streams/:userid
    
    This end point will allow you to view a single user and the amount of streams they are watching

- /api/streams/:userid/increase

  This endpoint increases the amount of streams someone is watching
- /api/streams/:userid/decrease

  This endpoint decreases the amount of streams someone is watching

## Installing a local copy

These instructions will help you to get a copy up and running on your local machine for testing purposes.

### Installing
Before installing this project, ensure you have this software installed:

Node.js 12.13.0

Duplicate or fork this repository from https://github.com/NickBansal/streamingApi.

Inside this new directory, install the required NPM packages:

```js
$ npm install 
```

### Run the application
```js
$ npm run dev
```

### Running the Tests
Automated tests for each endpoint are located in `./test.js`.

Run these tests using the command:
```js
$ npm run test
```
Results are then displayed for each test