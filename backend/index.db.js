const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(cors({
    origin: 'https://login-page-one-alpha.vercel.app',
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))



const existingUser = async(email)=> {
    // users.find(users=> users.email === email)
    return await client.db("login-app").collection("users").findOne({email})
}









const uri = "mongodb+srv://adham0110:fwPnCumnuWILY7MY@cluster0.5htglen.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("login-app").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

app.get("/",function(req,res){
    res.send("hello world")
})

const check = (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            error:{
                message:"Email and Password are required"
            }
        })
    }
    next()
}

app.post("/signup",check,async function(req,res){
    const {email,password} = req.body

 
    const userData = await existingUser(email)

    
   
    if(userData){
       return res.status(200).json({
            error:{
                message:"user already exists",
            }
            
        })
    }

    let payload = {email,password}
    await client.db("login-app").collection("users").insertOne(payload)

    return res.status(201).json({
        message:"User Created Successfully",
        payload,
       
    })
    res.send(req.body)


})

app.post("/login",check,async function(req,res){
    const {email,password} = req.body
    const userData = await existingUser(email)
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
            id:userData._id
        });

      
    }
    res.status(401).json({
        error:{
            message:"Invalid Credentials",
            
        },
        id:userData._id
    })

})

app.delete("/signup/:id",async function(req,res){

    const {id} = req.params
    const mongoDBID = new ObjectId(id)

    const response =  await client.db("login-app").collection("users").deleteOne({_id:mongoDBID})
   
    if(response.deletedCount === 0){
        return res.status(404).json({
            error:{
                message:"User not found"
            },
            
        })
       
        
    }

    return res.status(200).json({
        error:{
            message:"Deleted Successfully"
        },
    })
    
})


app.patch("/signup/:id",async function(req,res){

    const {id} = req.params
    const {password} = req.body
    const mongoDBID = new ObjectId(id)

    const response =  await client.db("login-app").collection("users").updateOne({_id:mongoDBID},{$set:{password}})
   
    if(response.modifiedCount === 0){
        return res.status(404).json({
            error:{
                message:"User not found"
            },
            
        })
       
        
    }

    return res.status(200).json({
        error:{
            message:"Updated Successfully"
        },
    })
    
})



app.listen(8080,function(){
    console.log("server started...")
    run().catch(console.dir);
})