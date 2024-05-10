FILE UPLOAD MANAGEMENT SYSTEM, SKIYWATER CODE CHALLENGE
=======================================================
This is a file upload and management system using Node.js, Express.js,
and Amazon S3 as a storage service.
The system allow only authenticated users to upload, retrieve, and delete files. Also a real-time notification system using socket.io that emit events to let other users know when a file has been uploaded to the system was implemented.

PROJECT STRUCTURE
=================
file_upload/
├── .env
├── .gitignore
└── src/
    ├── app.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── auth.controllers.js
    │   └── upload.controllers.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── upload.routes.js
    ├── models/
    │   ├── user.model.js
    │   └── upload.model.js
    └── utils/
        └── socket.utils.js

=> controllers:
- upload.controllers.js: Contains logics for handling file uploads,retrieving all files, retrieving a single file by Id and delete files.
- auth.controller.js: Contains logic registration and login

=> routes:
- upload.routes.js: Defines API endpoints related to file management and maps them to corresponding controller functions.
- auth.routes.js: Defines API endpoints and maps them to their corresponding controller functions

=> models:
- upload.model.js: Defines the Mongoose schema for files, including attributes like originalName, url, userId, and key.
- user.model.js: Defines the Mongoose schema for users, including attributes like fullname, email and password

=> config:
db.js: Configuration file for database connection

=> middlewares:
- authMiddleware.js: the middleware performs authorization checks based on user roles or permissions before allowing access to specific routes.
=> utils
- socket.utils.js: This function enables real-time notifications about uploaded files to all users.

=> Root Level Files:
- app.js: Entry point of the application where the server is initialized and middleware are configured.
- package.json: Configuration file for npm packages and project metadata.
- .env: Environment variable configuration file containing sensitive data like database credentials and S3 bucket credentials.
- .gitignore: Specifies which files and directories should be ignored by version control.

 URLS:
 ====
local url for postman =http://localhost:5000/api/v1
local url for swagger testing: http://localhost:5000/docs
Remote url = https://skiywater-file-upload.onrender.com/docs


HOW TO SETUP AND RUN THE APPLICATION:
===========================
=> Environment variables:
MONGODB_URI=
PORT=5000
JWT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

=> Run the following commands in the root directory:
- npm install
- npm start


ENDPOINTS AND USAGE SAMPLE:
==========================
- register
 Method: POST
 url = http://localhost:5000/api/v1/register
 body:
 {
    "fullname": "John Doe",
    "email": "johndoe@gmail.com",
    "password": "password"
 }

- login
Method: POST
url = http://localhost:5000/api/v1/login
body:
{
    "email": "johndoe@gmail.com",
    "password": "password"
}

- upload
Method: POST
url = http://localhost:5000/api/v1/upload
body:
{
    "uploadFile": "filename"
}

- files
Method: GET
url = http://localhost:5000/api/v1/files


- files/fileId
Method: GET
url = http://localhost:5000/api/v1/files/fileId


- files/fileId
Method: DELETE
url = http://localhost:5000/api/v1/files/fileId
submittion 