const express = require('express');
const connection = require('express')
const app = express();
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');


app.use(connection.static(path.join(__dirname,'resources')))
app.set('views',__dirname+'/views')

app.set('view engine','ejs');


app.get('/',(req,res)=>{


res.render("index");

});

//set storage
  const storage = multer.diskStorage({
//passing object
destination:'./resources/uploads/' ,
//location where we want to upload the our image
filename: function(req, file, cb)
{
	cb(null,file.originalname + '-' + Date.now() +
		path.extname(file.originalname)); 
}

  });

    const uploadImage = multer({
  	storage: storage
  	

  }).single('image');

    app.post('/imageupload',(req,res)=>
{
	uploadImage(req, res, (err) =>{
if(err){
	res.render('index',{
		msg: err
	} );
}else {
    res.send('image uploaded')
    }

	});
});


const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('host is working'));	