const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require('./URL_Shortener');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
const express=require('express')
const app=express()

app.get('/:shorturl',(req,res)=>{
    var docRef = db.collection("URL").doc(`${req.params.shorturl}`);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            res.redirect(doc.data().fullurl);
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });  
})


exports.app = functions.https.onRequest(app);