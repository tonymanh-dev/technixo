import React, { useState, useEffect } from 'react'
import './Board.css'
import Cell from './Cell'
import useTimer from '../hooks/timer'
import { CellData, Shape, Color } from '../types'

const Board: React.FC = () => {
  const [cells, setCells] = useState<CellData[]>([])
  const [selectedCells, setSelectedCells] = useState<number[]>([])
  const [attempts, setAttempts] = useState<number>(0)

  const { renderTime, stopTimer } = useTimer()

  useEffect(() => {
    // Initialize the game board with random shapes and colors
    const initBoard: CellData[] = generateRandomPairs()
    setCells(initBoard)
  }, [])

  // Define a function to generate random shape-color pairs
  const generateRandomPairs = (): CellData[] => {
    const pairs: CellData[] = []

    // Define the total number of pairs (8 pairs in this case)
    const totalPairs = 2

    // Loop to generate pairs
    for (let i = 0; i < totalPairs; i++) {
      const randomShape = Object.values(Shape)[Math.floor(Math.random() * 3)]
      const randomColor = Object.values(Color)[Math.floor(Math.random() * 3)]

      // Push the randomly generated shape-color pair into the 'pairs' array
      pairs.push({
        shape: randomShape,
        color: randomColor,
        isRevealed: false,
      })

      // Duplicate the pair to ensure each shape has a matching color
      pairs.push({
        shape: randomShape,
        color: randomColor,
        isRevealed: false,
      })
    }

    // Shuffle the 'pairs' array randomly
    return pairs.sort(() => Math.random() - 0.5)
  }

  const handleCellClick = (index: number) => {
    // Ensure no more than 2 cells are selected
    if (selectedCells.length < 2 && !cells[index].isRevealed) {
      // Reveal the clicked cell
      setSelectedCells([...selectedCells, index])
      setCells((prevCells) =>
        prevCells.map((cell, i) =>
          i === index ? { ...cell, isRevealed: true } : cell
        )
      )
    }
  }

  useEffect(() => {
    if (selectedCells.length === 2) {
      setAttempts(attempts + 1)

      const [cell1, cell2] = cells.filter((cell, index) =>
        selectedCells.includes(index)
      )

      if (cell1.shape === cell2.shape && cell1.color === cell2.color) {
        // Matched cells, keep them revealed
        setSelectedCells([])
      } else {
        // Not a match, hide the cells after 1 sec
        setTimeout(() => {
          setCells((prevCells) =>
            prevCells.map((cell, i) =>
              selectedCells.includes(i) ? { ...cell, isRevealed: false } : cell
            )
          )
          setSelectedCells([])
        }, 1000)
      }
    }
  }, [selectedCells])

  useEffect(() => {
    if (Array.isArray(cells) && cells.length > 0) {
      const allRevealed = cells.every((cell) => cell.isRevealed)

      // Show alert when all cells is revealed
      if (allRevealed) {
        stopTimer()
        setTimeout(() => {
          alert(
            `Congratulations! You matched all pairs in ${renderTime} and ${attempts} moves. Awesome job! 🏆`
          )
        }, 1000)
      }
    }
  }, [cells])

  console.log(cells)

  return (
    <div>
      <div className="time">
        <h1>{renderTime}</h1>
      </div>
      <div className="board">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            shape={cell.shape}
            color={cell.color}
            isRevealed={cell.isRevealed}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Board
