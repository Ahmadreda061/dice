import Die from "./Die"
import React  from "react"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [win, setWin] = React.useState(false)

  React.useEffect(() => {
    const finshGame = dice.every(die => (die.isHeld && die.value === dice[0].value))
    if(finshGame)
      setWin(true)
  }, [dice])
  function genrateNewDie() {
    return {
      value: Math.ceil(6 * Math.random()),
      isHeld: false 
    }
  }
  function allNewDice() {
    let randArr = []
    for(let i = 0; i < 10; i++) {
        randArr.push(genrateNewDie())
    }
    return randArr
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return !die.isHeld ? genrateNewDie() : die})
    )
  }

  function handaleHeld(dieId) {
    setDice(prevDice => prevDice.map((die, index) => 
      index === dieId ? {...die, isHeld: !die.isHeld} : die))
  }

  function playAgian() {
    setWin(false)
    setDice(allNewDice())
  }
  
  const dieElements = dice.map((die, index) => 
    <Die 
      key={index}
      id={index}
      value={die.value}
      held={die.isHeld}
      handaleHeld={handaleHeld}
    />
  )

  return (
    <main>
      {win && <Confetti />}
      <div className="info">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
      </div>
      
      <div className="dices">
        {dieElements}
      </div>
      <button className="roll" onClick={win ? playAgian : rollDice}>{win ? "Play Again": "Roll"}</button>
    </main>
  )
}

