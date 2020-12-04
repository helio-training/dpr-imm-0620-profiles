const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_KEY = process.env.JWT_KEY;

const users = [
  {
    id: 1,
    email: 'wcutting@heliotraining.com',
    password: 'helloworld',
    role: 'admin'
  },
  {
    id: 2,
    email: 'mbrown@heliotraining.com',
    password: 'heliorox',
    role: 'basic'
  },
  {
    id: 3,
    email: 'wbell@heliotraining.com',
    password: '!password1',
    role: 'basic'
  }
]

const tasks = [
  {
    todo: 'Laundry',
    complete: true,
    createdBy: 2 // UserID of User that created this task
  },
  {
    todo: 'Buy Groceries',
    complete: true,
    createdBy: 2
  },
  {
    todo: 'Vacuum',
    complete: false,
    createdBy: 2
  },
  {
    todo: 'Cook',
    complete: false,
    createdBy: 2
  },
  {
    todo: 'Homework',
    complete: true,
    createdBy: 3
  },
  {
    todo: 'Watch Netflix',
    complete: true,
    createdBy: 3
  },
  {
    todo: 'Party',
    complete: false,
    createdBy: 3
  },
  {
    todo: 'Party Harder',
    complete: false,
    createdBy: 3
  }
]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/tasks', async function(req, res){
  const token = req.header('auth');
  if(token){
    const decoded = await jwt.verify(token, JWT_KEY);
    if(decoded.role === 'admin'){
      res.send(tasks);
    } else if(decoded.role === 'basic') {
      const filteredTasks = tasks.filter((task) => task.createdBy === decoded.id);
      res.send(filteredTasks);
    } else {
      res.status(403).send({msg: "Unauthorized to access that Data"});
    }
  }else {
    res.status(403).send({msg: "Need to be Logged In to access this Data"})
  }
})

router.post('/login', async function(req, res) {
  const body = req.body;
  const foundUser = users.find((user)=> {
    return user.email === body.email
  })
  if(foundUser){
    if(foundUser.password === body.password){
      const token = await jwt.sign({ id: foundUser.id, role: foundUser.role }, JWT_KEY);
      res.set('auth', token);
      res.set('Access-Control-Expose-Headers', 'auth');
      res.send({ msg: 'Successfully Logged In' });
    } else {
      res.status(401).send({ msg: 'Invalid User' });
    }
  }else {
    res.status(401).send({ msg: 'Invalid User' });
  }
})

module.exports = router;
