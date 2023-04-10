const express = require('express')
const app = express()
const port = 3000  //w3
const jwt = require('jsonwebtoken')


//app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/token', verifytoken, (req, res) => {
  console.log(req.user)
  res.send('Login successful')
});


app.post('/bye', (req, res) => {
    let data = req.body
    res.send('Post request' + data.username);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

let dbUsers = [
  {
      username: "Soo",
      password: "password",
      name: "Soo Yew Guan",
      email: "soo@utem.edu.my"
  },
  {
      username: "Ali",
      password: "123",
      name: "Ali",
      email: "ali@utem.edu.my"
  },

  {
      username: "Elvin",
      password: "hahaha",
      name: "Elvin",
      email: "elvin@utem.edu.my"
  }
]

function login(username, password)
{
  console.log("someone try to login with", username, password)

  let matched = dbUsers.find (key =>
      key.username == username
  )
  if (matched) 
  {
      if (matched.password == password)
      {
          return matched
      }

      else
      {
          return "Password not matched"

      }
  }
  else 
  {
      return "Username not found"

  }
}

function register(newusername,newpassword,newname,newemail)
{
  // TODO: Check if username exist
  let matched = dbUsers.find (key =>
      key.username == newusername)

      if (matched)
      {
          return "Username has been used, cannot be register"
      }
      else
      {
          dbUsers.push(
              {
                  username : newusername,
                  password : newpassword,
                  name : newname,
                  email : newemail
              }
          )
          return "register successfully"

      }
}

//week4
function generatetoken(userProfile){
  return jwt.sign(
    userProfile
    //data 'foobar'
  ,'secret', {expiresIn: 60*60});
}

function verifytoken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'secret', function(err,decoded){
    if(err){
      res.send("Invalid Token")
    }
    else{
      req.user = decoded //bar
     }
      next()
  });

}

//week3
// enable json body parsing
app.use(express.json());

app.post('/hi', (req,res) => {
  let data = req.body
  res.send('Post request' + JSON.stringify(data))
}); 

app.post('/login', (req,res) => {
  let data = req.body
  //res.send(
    //login(
      //data.username,
      //data.password
      let user = login(data.username, data.password)
      res.send(generatetoken(user))
});

  
 

app.post('/register', (req,res) => {
  let data = req.body
  res.send(
    register(
      data.newusername,
      data.newpassword,
      data.newname,
      data.newemail
    )
  );
}); 


app.post('/login', (req,res) => {
  // get the username and password from the request body
  const {username, password} = req.body;

  // find the user in the database
  const user = dbUsers.find(user.username === username && user.password === password);

  // if user is found, return the user object
  if (user) {
    res.send(user);
  } else {
    // if user is not found, return an error message
    res.send ({error :"User not found"});
  }

})