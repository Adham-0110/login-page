const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const users =[{
    id:1,
    email:"adham@example.com",
    password:123
}]

const existingUser = (email)=> users.find(users=> users.email === email)



app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.post("/signup",function(req,res){
    const {email,password} = req.body
    const userData = existingUser(email)

    console.log(userData)
   
    if(userData){
       return res.status(200).json({
            error:{
                message:"user already exists",
            }
            
        })
    }

    let payload = {id:users.length+1,email,password}
    users.push(payload)

    return res.status(201).json({
        message:"User Created Successfully",
        payload,
        users
    })
    res.send(req.body)


})

app.post("/login",function(req,res){
    const {email,password} = req.body
    const userData = existingUser(email)
    console.log(userData)

    if(!userData){
        return res.status(404).json({
            error:{
                message:"User not found"
            },
            user:userData
        })
       
        
    }

    if(userData.password == password){
        res.status(200).json({
            message:"Login Successful",
            user:userData
        });

      
    }
    res.status(401).json({
        error:{
            message:"Invalid Credentials",
            
        },
        user:userData
    })
   
   

    
})

app.listen(8080,function(){
    console.log("server started...")
})