import React from 'react'
import "./Button.css"

const Button = ({onClick, isTimerActive}) => {
  return (
    <div className="btn-container">
        <button onClick={onClick}>{isTimerActive ? "Cancel Timer" : "Start Timer"}</button>
    </div>
  )
}

export default Button