import React from 'react'
import Board from './components/Board'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shape Matcher</h1>
      </header>
      <main className="main-game">
        <Board />
      </main>
    </div>
  )
}

export default App
