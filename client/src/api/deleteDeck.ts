export async function deleteDeck(deckId : string) {
    await fetch(`http://localhost:5000/decks/${deckId}`,{
        method : "DELETE",
    })
}