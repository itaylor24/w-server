const express = require('express');
const asyncHandler = require('express-async-handler'); 

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./keys/wardrobe-615b4-8afe0e2d1873.json');
const { FirestoreManager } = require('./utils');

initializeApp({
  credential: cert(serviceAccount)
});


const db = getFirestore();
const fsManager = new FirestoreManager(db); 


const app = express();
const PORT = 3001;


app.get('/test', (req,res)=>{
    res.send('hello world')
})

app.use(express.json()); 

app.post('/api/create-user', asyncHandler( async (req,res)=>{
    const data = req.body; 
    const userDetails = await fsManager.addUser(data); 
    res.json({message: "Success", user: userDetails});  
}))

app.post('/api/create-item', asyncHandler( async (req,res)=>{
    const data = req.body; 
    const itemDetails = await fsManager.addItem(data); 
    res.json({message: "Success", item: itemDetails});  
}))

app.post('/api/create-outfit', asyncHandler( async (req,res)=>{
    const data = req.body; 
    const outfitDetails = await fsManager.addOutfit(data); 
    res.json({message: "Success", item: outfitDetails});  
}))


app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
}); 

