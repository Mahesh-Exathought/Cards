"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const getDecksController_1 = require("./controllers/getDecksController");
const createDeckController_1 = require("./controllers/createDeckController");
const deleteDeckController_1 = require("./controllers/deleteDeckController");
const PORT = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("hello world");
});
// app.get("/decks", async(req,res)=>{
//     //TODO: fetch all decks and send back to the user
//     //1. how do we fetch the decks from the mongo?
//     const decks = await Deck.find();
//     //console.log(decks);
//     //2. how do we send back the array to the UI?
//     res.json(decks)
// })
app.get("/decks", getDecksController_1.getDecksControllers);
// app.post("/decks", async(req , res)=>{
//     const newDeck = new Deck({
//         title : req.body.title
//     })
//     const createdDeck = await newDeck.save()
//     res.json(createdDeck)
// })
app.post("/decks", createDeckController_1.createDeckController);
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
app.delete("/decks/:deckId", deleteDeckController_1.deleteDeckController);
mongoose_1.default.connect((_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : "")
    .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
});
//run first npm run build
//then npm start
