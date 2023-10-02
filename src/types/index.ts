export interface CellData {
  shape: Shape
  color: Color
  isRevealed: boolean
}

export enum Shape {
  Circle = 'circle',
  Square = 'square',
  Triangle = 'triangle',
}

export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}
