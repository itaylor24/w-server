const express = require('express');
const asyncHandler = require('express-async-handler'); 

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

//const serviceAccount = require('./budget-tracker-8c648-firebase-adminsdk-81i0g-6c602e2b48.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();



const app = express();
const PORT = 3001;


app.get('/test', (req,res)=>{
    res.send('hello world')
})

app.get('/test-add', asyncHandler( async (req,res)=>{
    const docRef = db.collection('users').doc('alovelace');

    await docRef.set({
        first: 'Ada',
        last: 'Lovelace2',
        born: 1815
    });
    
    
}))

app.get('/test-query', asyncHandler(async (req,res)=>{
    const snapshot = await db.collection('users').get();
    let infoTemp = ''; 
    snapshot.forEach((doc) => {
        infoTemp += doc.id + '=>' + JSON.stringify(doc.data()) + '\n'; 

    });
    const info = infoTemp; 
    res.send(info); 
})); 


app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
}); 

