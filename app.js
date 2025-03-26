const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { prototype } = require('events');
let cors=require("cors");
const { cpus } = require('os');
require('dotenv').config()
const app = express();
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files (CSS, images)
app.use(cors())
app.use(cookieParser()); // Enable cookies
app.get('/', (req, res) => {
    const user = req.cookies.user || null; // Check for user login cookie
    res.render('index', { user });
});

async function connected(){
  try{
      await mongoose.connect('mongodb+srv://nishantadvani724:kPpWtMq8ZR5K4kMN@cluster0.qh81f.mongodb.net/rohitteams?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(()=>{
        console.log("database connected")
      }).catch((err)=>{
        if(err){
          console.log("database not connected")    
        }
        
      })
  }catch(err){
    if(err){
      console.log("some error comes in the database")
    }
  }
     
}
connected();







const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

 const User = mongoose.model('User', userSchema);
 const pc = new mongoose.Schema({}, { strict: false});

 const cpu = mongoose.model("cpus",pc,"cpus");
 const gpu = mongoose.model("gpus",pc,"gpus");
 const psu = mongoose.model("psus",pc,"powersupplys");
 const ram = mongoose.model("rams",pc,"rams");
 const ssd = mongoose.model("ssds",pc,"ssds");
 const mobo = mongoose.model("motherboards",pc,"motherboards");
 const cases = mongoose.model("cases",pc,"cases");
 const cooler = mongoose.model("coolers",pc);

// PC Build Details Page
app.get('/build/:id', (req, res) => {
    const builds = getBuilds();
    const build = builds.find(b => b.id === req.params.id);

    if (build) {
        res.render('build-details', { build });
    } else {
        res.status(404).send("Build not found");
    }
});

// Login Page
app.get('/login', (req, res) => {
  if (req.cookies.user) {
      return res.redirect('/');
  }
  res.render('login');
});

//simulated logins
app.post('/login',async(req,res)=>{
try{
  const {email , password}= req.body;
  let data=await User.find({email,password});



  if(data){
  
    res.cookie('user', JSON.stringify({name:data[0].name, email: email, password: password }), { maxAge: 3600000 });
    res.redirect("/");
  }
  const user = req.cookies?.user // Check for user login cookie
  res.render('index', { user });

}catch(err){
  if(err){
   console.log("not found")
  }
}

})

// Sign-up Page
app.get('/signin', (req, res) => {
  
  if (req.cookies.user) {
      return res.redirect('/');
  }
  res.render('signin');
});

app.post('/signin', async (req, res) => {
  try{
    const { name, email, password } = req.body;

    const user = new User({ name, email, password });


    await user.save();
    res.cookie('user', JSON.stringify({ name: name, email: email, password: password }), { maxAge: 3600000 });
    res.redirect('/');
  }catch(err){
    console.log("data is not send")
  }
  
  
});

app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/');
});

app.get('/guide', (req, res) => {
  res.render('guide', { user: req.cookies.user || null }); 
})

app.get('/about', (req, res) => {
  res.render('about', { user: req.cookies.user || null }); 
})

app.get('/contact', (req, res) => {
  res.render('contact', { user: req.cookies.user || null }); 
})

app.get('/your-build', (req, res) => {
  res.render('your-build', { user: req.cookies.user || null});
})
app.get('/AI-build', async (req, res) => {
  const amount = req.query.amount;

  if (!amount) {
    // If no amount is provided, render the page with a default message and no PC parts
    return res.render('AI-build', { pcParts: null, message: 'Please enter a budget to generate the PC build.',user: req.cookies.user || null });
  }

  const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
  const apiKey = process.env.KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: `You will only list out the parts of the PC with their full brand name (e.g., Intel i5-12400F, Ryzen 5 5500, etc.), along with their price. Ensure the parts are compatible and fit within a budget of $${amount}.Do not say anything else other than the pc parts`,
    });

    const generationConfig = {
      temperature: 0,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 4000,
      responseMimeType: "application/json",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: `${amount} USD` }],
        },
      ],
    });

    const result = await chatSession.sendMessage(`${amount} USD`);
    const responseText = result.response.text();
    const pcParts = JSON.parse(responseText);
    
    res.render('AI-build', { pcParts: pcParts, message: `Generated PC build for $${amount}`,user: req.cookies.user || null });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/Component', (req, res) => {
  res.render('Component', { user: req.cookies.user || null });  
})
app.get('/submit-contact', (req, res) => {
    res.render('submit-contact');
});




app.get('/processor', async (req, res) => {
  try{
  let cpus = await cpu.find();
  res.render('processor', { user: req.cookies.user || null , cpus });
  }
  catch(err){
    console.log(err)
  }
});

app.get('/cabinet', async (req, res) => {
  try{
    let cabinet = await cases.find();
  res.render('cabinet', { user: req.cookies.user || null , cabinet });
}
catch(err){
  console.log(err)
}
});

app.get('/cooler', async (req, res) => {
  try{
    let coolers = await cooler.find();
  res.render('cooler', { user: req.cookies.user || null , coolers });
}
catch(err){
  console.log(err)
}
});

app.get('/gpu', async (req, res) => {
  try{
    let gpus = await gpu.find();
  res.render('gpu', { user: req.cookies.user || null , gpus });
}
catch(err){
  console.log(err)
}
});

app.get('/memory', async (req, res) => {
  try{
    let rams = await ram.find();
  res.render('memory', { user: req.cookies.user || null , rams });
}
catch(err){
  console.log(err)
}
});
app.get('/motherboard', async (req, res) => {
  try{
    let motherBoard = await mobo.find();
  res.render('motherboard', { user: req.cookies.user || null , motherBoard});
}
catch(err){
  console.log(err)
}
});

app.get('/powersupply', async (req, res) => {
  try{
    let psus = await psu.find();
  res.render('powersupply', { user: req.cookies.user || null , psus });
}
catch(err){
  console.log(err)
}
});

app.get('/storage', async (req, res) => {
  try{
    let ssds = await ssd.find();
  res.render('storage', { user: req.cookies.user || null , ssds });
}
catch(err){
  console.log(err)
}
});


const PORT = 9001;
app.listen(PORT, () => console.log(`Pass http://localhost:${PORT}`));
