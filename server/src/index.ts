import {config} from "dotenv"
config()
import express from "express"
import mongoose from 'mongoose'

import Deck from './models/Deck'
import cors from 'cors';
import { getDecksControllers } from "./controllers/getDecksController"
import { createDeckController } from "./controllers/createDeckController"
import { deleteDeckController } from "./controllers/deleteDeckController"

const PORT = 5000
const app = express()

app.use(cors())
app.use(express.json())



app.get("/", (req,res)=>{
    res.send("hello world")
})

// app.get("/decks", async(req,res)=>{
//     //TODO: fetch all decks and send back to the user
//     //1. how do we fetch the decks from the mongo?
//     const decks = await Deck.find();
//     //console.log(decks);
    
//     //2. how do we send back the array to the UI?
//     res.json(decks)
// })
app.get("/decks", getDecksControllers)

// app.post("/decks", async(req , res)=>{
//     const newDeck = new Deck({
//         title : req.body.title
//     })
//     const createdDeck = await newDeck.save()
//     res.json(createdDeck)
// })

app.post("/decks", createDeckController)

// app.delete("/decks/:deckId", async(req,res)=>{
//     //TODO:

//     // 1.get the deck id from the url
//     const deckId = req.params.deckId;

//     //2 delete the deck from mongo
//     const deck = await Deck.findByIdAndDelete(deckId)

//     //3 return the deletd deck to the user who made the request
//     // res.json({
//     //     message : "successfully deleted the entry"
//     // })
//     res.json(deck)

// })

app.delete("/decks/:deckId", deleteDeckController)

mongoose.connect(process.env.MONGO_URL ?? "")
.then(()=>{
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT)
})



//run first npm run build
//then npm start