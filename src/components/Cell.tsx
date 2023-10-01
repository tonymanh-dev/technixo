import React from 'react'
import './Cell.css'

interface CellProps {
  shape: 'circle' | 'square' | 'triangle'
  color: 'red' | 'green' | 'blue'
  isRevealed: boolean
  onClick: () => void
}

const Cell: React.FC<CellProps> = ({ shape, color, isRevealed, onClick }) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  return (
    <>
      <div
        className={`cell ${isRevealed ? 'revealed' : ''}`}
        onClick={isRevealed ? undefined : onClick}
      >
        {isRevealed ? (
          <div className={`shape ${shape} ${color}`}></div>
        ) : (
          'Click to reveal'
        )}
      </div>
    </>
  )
}

export default Cell
