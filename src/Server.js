const express=require('express');
const app=express();
const fs=require('fs');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

const port= process.env.PORT  || 3000;
console.log(port);

console.log("path is "+__dirname);
app.use(express.static(__dirname+"/public"));



app.use((req,res,next)=>{
     console.log('middleware function')
     var date=new Date().toString();
     var log=`${date} :::: ${req.method} :::: ${req.url}`;
     console.log(log);
     fs.appendFile('server.log', log+'\n',(err)=>{
          if(err)  
          console.log(err);
     })
     next();
});

app.get('/',(req,res)=>{

     res.render('home')
 })
 
 app.get('/addUser',(req,res)=>{
   
     res.render('addUser');
 })
 
 app.post('/addUser', (req,res)=>{
      res.redirect('/UserList');
 })
 
 app.get('/UserList', (req,res)=>{
    userlist=[{ id:1, name:'koti', age:'23'},{id:2, name:'uma', age:'23'},{id:3, name:'Ravi', age:'23'},
               {id:4, name:'Murali', age:'23'},{id:5, name:'Sainath', age:'23'},{id:6, name:'Harsha', age:'23'},
               {id:7, name:'Chakri', age:'23'}] 

     res.render('usersList',{
          users: userlist
       });
 })
 
 app.get('/Delete/:id', (req,res)=>{
     res.redirect('/UserList');
})
 
 app.get('/updatepage',(req,res)=>{
     user ={
          id:1,
          name:'koti',
          age:'23'
     } 
     res.render('updateuser',{
          user: user
       }); 
 })
      
     
 app.post('/update/:id',(req,res)=>{
     res.redirect('/UserList');
});

app.listen(port,()=>{
   console.log(`server is running in port ${port}`)
});


