const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose;
const bodyParser = require('body-parser');
const cors = require('cors');

// database

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

  // Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Client', {
  name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/clients')


// test
//server.get('/', (req, res, next) => res.send('Backend'));

// start 
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
