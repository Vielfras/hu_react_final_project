import { useEffect, useState } from 'react'
import './Free.css'

/*
1. V - Create an interface (it should describe the shape of the data we expect to get from the API)
2. V - Create two state variables : cards & error 
        cards= will hold the returned data.
        error= will hold a string describing an error, if such occured.
3. V - Fetch the cards (using the 'useEffect' hook- run it only once)
4. V - Render the cards\error (conditional rendering)
*/

interface ICard {
  _id:string
  title:string
  description:string
  image: { url:string, alt:string }
  bizNumber:number
  user_id:string
}

export default function Free() {

  const [cards,setCards] = useState<null|ICard[]>(null)
  const [error,setError] = useState<null|string>(null)

  useEffect(()=> {
    
      const fetchAllCards = async() => {
          try {
            const response = await fetch('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', {
              method: 'GET',
              headers: {'Content-Type': 'application/json'}
            })
            if (!response.ok) throw new Error('Internal server error')
            const data = await response.json()
            setCards(data)
          } catch(err) {
            const errMessage = (err as Error).message
            setError(errMessage)
          }
      }
      fetchAllCards()
    }
   ,[]
  )

  return (
    <div className='Free Page'>
      <h3>Free Page</h3>
      <br></br>

      { 
      (error) && 
        <p style={{color:'red'}}>Error getting cards 😔
         <br></br>{error}
        </p>
      }

      {
      (cards) ?
        cards.map((card)=> 
          <p key={card._id}>
            Title: {card.title}<br></br>
            <img style={{width:'200px',height:'200px',objectFit:'cover'}} src={card.image.url} alt={card.image.alt}/>
          </p>
        )
      :
        (!error) && 'No cards'
      }

    </div>
  )
}
