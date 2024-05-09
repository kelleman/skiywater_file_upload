FILE UPLOAD MANAGEMENT SYSTEM, SKIYWATER CODE CHALLENGE
=======================================================

Remote url = https://skiywater-file-upload.onrender.com
local url =http://localhost:5000/api/v1


Environment variables:
======================
MONGODB_URI=
PORT=5000
JWT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

How to run the application:
===========================
- npm install
- npm start

ENDPOINTS:
=========
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
