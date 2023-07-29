require('dotenv').config(); 

//express
const express = require('express');
const asyncHandler = require('express-async-handler'); 

//multer
const multer = require('multer'); 

//firebase
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const {getStorage, getDownloadURL} = require('firebase-admin/storage'); 

//path
const path = require('path');

//local files 
const serviceAccount = require('./keys/wardrobe-615b4-8afe0e2d1873.json');
const { FirestoreManager } = require('./utils');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL
});

//admin storage 
const bucket = getStorage().bucket(); 

//Multer 
const multerStorage = multer.memoryStorage()
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1mb 
const upload = multer({ storage: multerStorage, limits:{fileSize:MAX_FILE_SIZE}}); 

//cloud firestore 
const db = getFirestore();

//Firestore Manager
const fsManager = new FirestoreManager(db); 

//express 
const app = express();
const PORT = 3001;


app.get('/test', (req,res)=>{
    res.send('hello world')
})

app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

app.post('/api/create-user', asyncHandler( async (req,res)=>{
    const data = req.body; 
    const userDetails = await fsManager.createUser(data); 
    res.json({message: "Success", user: userDetails});  
    console.log(`Successfully created user\nDetails: ${JSON.stringify(userDetails)}`);
}))

app.post('/api/create-item', upload.single("image"), asyncHandler( async (req,res)=>{
    const data = req.body;

    if(req.file){
        const {file, ref} = await fsManager.uploadImageForItem(req, bucket); 
        data.imageURL = await getDownloadURL(file);
        data.fileRef = ref; 
    }

    const itemDetails = await fsManager.createItem(data); 
    res.json({message: "Success", item: itemDetails});
    console.log(`Successfully created item\nDetails: ${JSON.stringify(itemDetails)}`);   
}))

app.post('/api/create-outfit', asyncHandler( async (req,res)=>{
    const data = req.body; 
    const outfitDetails = await fsManager.createOutfit(data); 
    res.json({message: "Success", item: outfitDetails});  
    console.log(`Successfully created outfit\nDetails: ${JSON.stringify(outfitDetails)}`); 
}))




app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
}); 

