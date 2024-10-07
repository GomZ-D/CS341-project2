const express = require ('express');
const mongodb = require ('./db/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key'
    );
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accesss-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  app.use('/', require('./routes'));

//CHECK FOR ANY ERROR 
process.on('uncaughtException', (err,origin)=> {
    console.log(process.stderr.fd, `Cought exception: ${err}\n` + `Exception origin: ${origin}`);
  } )

  mongodb.conectDB ((error)=>{
    if (error) {
        console.log(error);
    } else {
        app.listen(port, ()=> {
            console.log(`Server & Database is RUNNING on Port: ${port} `)
        })
    }
  })