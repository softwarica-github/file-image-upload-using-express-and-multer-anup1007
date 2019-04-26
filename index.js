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
  const locations = multer.diskStorage({
//passing object
destination:'./resources/uploads/' //set location to upload image
,
filename: function(req, file, cb)
{
	cb(null,file.originalname + '-' + Date.now() +
		path.extname(file.originalname)); 
}

  });

    const uploadImage = multer({
  	storage: locations,
    limits:{fileSize: 255000},
    fileFilter: function(req,file,cb){
      validation(file,cb);
    }

  }).single('photo');

  function validation(file,cb){
    const filetypes = /png|jpg|jpeg|gif/;
    const extname = filetypes.test(path.extname(file.originalname)
      .toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
      if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Please upload image only');
  }
  }

app.post('/imageupload',(req,res)=>
{
  uploadImage(req, res, (err) =>{
if(err){
  res.render('index',{
    msg: err
  } );
}else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Alert: No image has choose!'
        });
      } else {
        res.render('index', {
          msg: 'Image Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }

  });
});


const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('host is working'));	