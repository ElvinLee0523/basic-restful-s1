const express = require('express')
const app = express()
const port = 3000

//app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
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
      name: "Elvin",
      email: "elvin@utem.edu.my"
  }
]

function login(username, password)
{
  console.log("someone try to login with", username, password)

  let matched = dbUsers.find (element =>
      element.username == username
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
  let matched = dbUsers.find (element =>
      element.username == newusername)

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

// enable json body parsing
app.use(express.json());

app.post('/hi', (req,res) => {
  let data = req.body
  res.send('Post request' + JSON.stringify(data));
}); 

app.post('/hi1', (req,res) => {
  let data = req.body
  res.send(
    login(
      data.username,
      data.password
    )
  );
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