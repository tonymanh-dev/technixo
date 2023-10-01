export type Shape = 'circle' | 'square' | 'triangle'
export type Color = 'red' | 'green' | 'blue'

export interface CellData {
  id: number
  shape: Shape
  color: Color
  isRevealed: boolean
}
