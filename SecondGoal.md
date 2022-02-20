API Choosen is REST because of basic CRUD operations
Authentication mechanism is JSON Web Token (JWT) used via Passport library
Database is MongoDB instead of MySql as it will be great fit to work with node.js as NoSQL DB & it's fast in performance then MySQL db

Table Design

|users|
|id:ObjectId| |name:String| |email:String| |password:String(Hashed)| |createdAt:Date| |updatedAt:Date|

|shortlinks|
|id:ObjectId| |shortlink:String| |user:ObjectId| |url:String| |description:String| |tags:Array String| |createdAt:Date| |updatedAt:Date|