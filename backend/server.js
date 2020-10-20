import express from 'express';
import data from './data';

const app= express();

app.get("/api/products/:id", (req, res) =>{
    const productId = req.params.id;
    const product= data.products.find(x=>x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg:"Product Not Found."})

}); 

app.get("/api/products", (req, res) =>{

    res.send(data.products);
});

//Heroku
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// ** MIDDLEWARE-HEROKU ** //
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://polar-cove-82435.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.listen(5000, () => {console.log("Server started at http://localhost:5000") })