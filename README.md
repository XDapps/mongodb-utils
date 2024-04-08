# MongoDB Utils

This is a basic wrapper around the MongoDB SDK with some simple static functions to interact with a Mongo Database.

## Basics

1. Create a MongoDB either locally or in the cloud.
2. Create a .env file and set your MongoDB connection string.

```env
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017
```

### How To Use

```js

import {MongoDB} from "@xdapps/mongodb-utils"

const db = new MongoDB("database_name");
const collectionName = "users";
const searchCriteria = {email: "johnDoe@gmail.com"};
const docResult = await db.getSingleDocFromDb(collectionName, searchCriteria);

```
