import React, { useState, useEffect } from 'react'
import { CellData, Shape, Color } from '../types'
import Cell from './Cell'
import './Board.css'

const Board: React.FC = () => {
  // states...
  const [cells, setCells] = useState<CellData[]>([])
  const [selectedCells, setSelectedCells] = useState<number[]>([])
  const [attempts, setAttempts] = useState<number>(0)

  useEffect(() => {
    // Initialize the game board with random shapes and colors
    initializeBoard()
  }, [])

  const initializeBoard = () => {
    const shapes: Shape[] = ['circle', 'square', 'triangle']
    const colors: Color[] = ['red', 'green', 'blue']

    const initialCells: CellData[] = []
    const usedIds: Set<number> = new Set()

    for (let i = 0; i < 16; i++) {
      // Generate pair of matching shape/color
      // TODO: Redesign logic above
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      let id
      // Check duplicate id
      do {
        id = Math.floor(Math.random() * 16)
      } while (usedIds.has(id))

      usedIds.add(id)

      initialCells.push({
        id,
        shape: randomShape,
        color: randomColor,
        isRevealed: false,
      })
    }

    setCells(initialCells)
  }

  const handleCellClick = (index: number) => {
    // Reveal cell, check for matches, update game state, and handle game completion
    if (selectedCells.length < 2 && !cells[index].isRevealed) {
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
        // Not a match, hide the cells after a delay
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

  console.log(cells)
  console.log(selectedCells)

  // 1. The game board consists of a 4x4 grid (total of 16 cells). => DONE
  // 2. Each cell contains a randomly generated shape (circle, square, or triangle) in a random color (red, green, or blue). => DOING
  // 3. The grid should have 8 pairs of matching shapes/colors. => DOING
  // 4. When a user clicks on a cell, the shape/color is revealed. => DONE
  // 5. The user can only reveal two cells at a time. => DONE
  // 6. If the revealed shapes/colors match, the cells remain open. => DONE
  // 7. If the revealed shapes/colors don't match, the cells are automatically hidden after a 1-second delay. => DONE
  // 8. The game ends when all pairs are matched, and the user is shown a completion message with the number of attempts it took to finish the game. => DOING

  return (
    <div className="board">
      {cells.map((cell, index) => (
        <Cell
          key={cell.id}
          shape={cell.shape}
          color={cell.color}
          isRevealed={cell.isRevealed}
          onClick={() => handleCellClick(index)}
        />
      ))}
    </div>
  )
}

export default Board
