const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'angular_todoapp',
  insecureAuth: true
})
const app = express()

app.use(cors())
app.use(bodyParser.json());

app.get('/records',function(_req,res){
  // connection.connect()

  connection.query("select * from todos",function(err,result){
      if(err)throw err
      res.send(result)
  })
  // connection.destroy();

})
app.delete("/delete/:id",(req,res) => {
  connection.query(`delete from todos where id=?`,[req.params.id],(err,result) => {
    if(err){
      res.send(err)
    }
    res.send(result)
  })
})
app.post('/newtodo',(req,res) => {
  const title = req.body.title
  const date = req.body.date
  const description = req.body.description
  const priority = req.body.priority

  if (!title || !date || !description || !priority) {
     res.send({ error: "All fields are required" });
  }

  const query =`INSERT INTO todos (title,date,description,priority) values (?,?,?,?) `
  connection.query(query,[title,date, description,priority],(err, result) => {
    if(err){
      console.log(err)
       res.send({error: "Internal Server Error"})
    }
     res.send({message:"Record is added to database", id: result.insertId})
  })
})

app.put('/edit/:id',(req,res) => {
  connection.query(`update todos set title=?,date=?,description=?, priority=? where id = ?`,[req.body.title,req.body.date,req.body.description,req.body.priority,req.params.id],(err,result)=>{
    if(err){
      res.send(err)
    }
   
    res.send({message: `Record with id: ${req.params.id} is updated!`})
  })
})
app.listen(1000,()=>{ 

  console.log("Server is started at http://localhost:1000  address")
})