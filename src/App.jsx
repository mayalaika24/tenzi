import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import './App.css'
import Die from './components/Die'
function App() {
  function allNewDices () {
    const newArr = []
    for (let i = 0; i < 10; i++) {
      const random = Math.ceil(Math.random() * 6)
      newArr.push({id: nanoid(), value: random, isHeld: false})
    }
    return newArr
  }
  function holdDice (id) {
    setAllNewDice(prevState => {
      return prevState.map(item => {
        return item.id === id ? {...item, isHeld: !item.isHeld} : item
      })
    })
  }
  const [allNewDice, setAllNewDice] = useState(allNewDices())
  const [tenzies, setTenzies] = useState(false)
  const dies = allNewDice.map(item => {
    return <Die value={item.value} id={item.id} holdDice={holdDice} isHeld={item.isHeld} key={item.id}/>
  })
  function handleClick () {
    if (tenzies) {
      setAllNewDice(allNewDices())
      setTenzies(false)
    } else {
      setAllNewDice(prevState => {
        return prevState.map(item => {
          const random = Math.ceil(Math.random() * 6)
          return item.isHeld ? item : {id: nanoid(), isHeld: false, value: random}
        })
      })
    }
  }
  useEffect(() => {

    const value = allNewDice[0].value
    const newArr = allNewDice.filter(item =>{
      return item.value === value && item.isHeld
    })
    if (newArr.length === 10) {
      setTenzies(true)
    }
  }, [allNewDice])
  return (
    <main>
      { tenzies && <Confetti />}
      <div className='container'>
      <h1 className='title'>Tenzies</h1>
        <p className='instructions'>Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.
        </p>
        <div className='dies-container'>
          {dies}
        </div>
        <button onClick={handleClick}>{tenzies ? 'New Game' : 'Roll'}</button>
      </div>
    </ main>
  )
}

export default App
