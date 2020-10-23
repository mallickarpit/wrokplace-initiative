const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

//Setting a public folder for the styles
app.use(express.static(path.join(__dirname,'/public')));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Initiating a connection to MySql server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'workplace-initiative'
})

//Setting view-engine to EJS
app.set('view-engine','ejs');

//Connecting to mysql
db.connect((err)=>{
    if(err)
        throw err;
    console.log('Mysql database connected....');
})

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const port=3000||process.env.PORT;
app.listen(port,()=>console.log(`Server started on port ${port}...`))