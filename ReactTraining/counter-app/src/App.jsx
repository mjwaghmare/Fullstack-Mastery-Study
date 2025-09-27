import React, { useState } from 'react'
import CustomButton from './components/button'
import './App.css'

const App = () => {

  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  const updateStep = (event) => {
    const newStep = parseInt(event.target.value)
    setStep(newStep)
  }

  const increment = () => {
    setCount(count + step)
  }

  const decrement = () => {
    setCount(count - step)
  }

  return (
    <div className="body" align="center">
      <h1 className="header-txt">Current count:</h1>
      <p className="count">{count}</p>
      <div className="counter-btns">
        <CustomButton onClick={increment} btnName=" + " />
        <CustomButton onClick={decrement} btnName=" - " />
      </div>
      <div className="step-value">
        <label>Step:</label>
        <input type="number" value={step} onChange={updateStep} />
      </div>
    </div>
  )
}

export default App