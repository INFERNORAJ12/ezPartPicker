let express = require('express');
let cors = require('cors'); //if the server is running in different and website url 
let mongoose = require('mongoose');
 require('dotenv').config();
let app = express();
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json())
async function connections() {

    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }   

}

connections();
let schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String 
});
let model = mongoose.model('signin', schema);
app.post('/', async (req, res) => {
    
  
    try {
      let { name, email, password } = req.body;
   
  
      if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
      }
  
      let user = new model({ username:name, email, password });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error('Error saving user:', error.message);
      res.status(500).send('Server Error');
    }
  });
  app.get('/db', async (req, res) => {
    try {
      let users = await model.find({});
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error.message);
      res.status(500).send('Server Error');
    }
  })
app.listen(2000)