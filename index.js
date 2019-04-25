const express = require('express');
const connection = require('express')
const app = express();
const path = require('path');
const ejs = require('ejs');


app.use(connection.static(path.join(__dirname,'resources')))
app.set('views',__dirname+'/views')

app.set('view engine','ejs');


app.get('/',(req,res)=>{


res.render("index");

});


const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('host is working'));	