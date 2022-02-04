import { CSSProperties } from "react"

export type DirectionKey = {
  directionName: string
  key: string
  handler: (cells: GameCellType[]) => GameData
}

export type GameData = {
  gameCells: GameCellType[]
  score: number
  hasValidMovements: boolean
}

export type Coordinate = 'x' | 'y' | 'z'

export type HexagonColors = {
  [colorValue: string]: { backgroundColor: string; color?: string }
}

export type GameCellType = {
  x: number
  y: number
  z: number
  value: number
  style?: CSSProperties
}

export type HexagonDimensions = {
  hexagonSize: number
  triangleBase: number
  triangleHeight: number
  numberOfHexagons: number
}

export type GameSetupProps = {
  startGame: () => void
}