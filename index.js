const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const app = express();
cluster.schedulingPolicy = cluster.SCHED_RR

if (cluster.isMaster) {
  console.log('Master')
  cluster.fork()  
} else {
  console.log('Child')

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 515, 'sha512', () => {
      res.send('Hello')
    })
  })

  app.get('/fast', (req, res) => {
    res.send('This is faster')
  })

  app.listen(5000)
}