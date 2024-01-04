import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';

export type TDeck = {
  title : string,
  _id : string
}

function App() {
  // const [count, setCount] = useState(0)
  const [title,setTitle] = useState('');
  const [decks,setDecks] = useState<TDeck[]>([])

async function handleCreateDeck(e:React.FormEvent){
    e.preventDefault()
  // const response = await fetch('http://localhost:5000/decks', {
  //     method : 'POST',
  //     body : JSON.stringify({
  //       title
  //     }),
  //     headers : {
  //       "Content-Type" : "application/json"
  //     }
  //   })
  //   const deck = await response.json()
  const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle('')
    
  }

  useEffect(()=>{
    // console.log("wer are here");

    // return () => {
    //   console.log("cleanup");
    // }

    async function fetchDecks(){
      const newDecks = await getDecks()
      // const response = await fetch("http://localhost:5000/decks")
      // const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  },[])
// async function handleCreateDeck(e: React.FormEvent) {
//   e.preventDefault();

//   const response = await fetch('http://localhost:5000/decks', {
//     method: 'POST',
//     body: JSON.stringify({
//       title,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     // If the deck is successfully created, fetch the updated list of decks
//     const newDecksResponse = await fetch('http://localhost:5000/decks');
//     const newDecks = await newDecksResponse.json();

//     // Update the state with the new decks
//     setDecks(newDecks);

//     // Reset the title
//     setTitle('');
//   }
// }

  useEffect(()=>{
    // console.log("wer are here");

    // return () => {
    //   console.log("cleanup");
    // }

    async function fetchDecks(){
      // const response = await fetch("http://localhost:5000/decks")
      // const newDecks = await response.json()
      const newDecks = await getDecks();
      setDecks(newDecks)
    }
    fetchDecks()
  },[])

  async function handleDeleteDeck(deckId:string){
    await deleteDeck(deckId)
    // await fetch(`http://localhost:5000/decks/${deckId}`,{
    //   method: "DELETE"
    // })

    // optimized approach
    setDecks(decks.filter((deck)=>deck._id !== deckId))
  }

  return (
    <div>

    <ul className='decks'>
      {decks.map((deck)=>(
        <li key={deck._id}>
          <button onClick={()=>handleDeleteDeck(deck._id)}>X</button>
          <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          {/* {deck.title} */}
          </li>
      ))}
    </ul>

      <form onSubmit={handleCreateDeck}>
        <label htmlFor='deck-title'>Deck Title</label>
        <input 
          id='deck-title'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>
            // TODO: save what they have typed
            {
              setTitle(e.target.value)
            }
          }
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
