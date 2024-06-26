const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',            // by default: '1.0.0'
    title: 'File Upload APIs',              // by default: 'REST API'
    description: 'Documentation for File Upload Management System API Services'         // by default: ''
  },
  host: 'localhost:5000',                 // by default: 'localhost:3000'
  basePath: '/api/v1',   
  servers: [
    {
      "url":"https://skiywater-file-upload.onrender.com", "description":"production server"
  },
    {
        "url": "http://locahost:5000", "description": "local server"
    }
    
  ],          
  schemes: ['http', 'https'],             
  consumes: ['application/json', 'multipart/form-data'],             
  components: {
    securitySchemes: {
      bearerAuth: {
        name: "authorization",
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Set bearer header for authentication'
      }
    }
  },
  produces: ['application/json'],             // by default: ['application/json']
  tags: [                   // by default: empty Array
    {
      name: 'example',             // Tag name
      description: ''       // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {
    bearerAuth: {
        name: "authorization",
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Set bearer header for authentication\nFormat: `Bearer token`'
      }
  },  // by default: empty object
  definitions: {}, // by default: empty object
  security: [{bearerAuth: []}],
  
};

const outputFile = './swagger_output.json';
const routes = ['./routes/auth.routes.js', './routes/upload.routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);