import { Coordinate, DirectionKey, GameCellType, GameData } from './types'

const moveUp = (gameCells: GameCellType[]): GameData => {
  const groupedCellsArrays = getGroupedCells(gameCells, 'x', 'y')
  return getUpdatedGame(groupedCellsArrays)
}

const moveTopLeft = (gameCells: GameCellType[]): GameData => {
  const groupedCellsArrays = getGroupedCells(gameCells, 'z', 'y')
  return getUpdatedGame(groupedCellsArrays)
}

const moveTopRight = (gameCells: GameCellType[]): GameData => {
  const groupedCellsArrays = getGroupedCells(gameCells, 'y', 'x')
  return getUpdatedGame(groupedCellsArrays)
}

const moveBottom = (gameCells: GameCellType[]): GameData => {
  const groupedCellsArrays = getGroupedCells(gameCells, 'x', 'z')
  return getUpdatedGame(groupedCellsArrays)
}

const moveBottomLeft = (gameCells: GameCellType[]): GameData => {
  const groupedCellsArrays = getGroupedCells(gameCells, 'y', 'z')
  return getUpdatedGame(groupedCellsArrays)
}

const moveBottomRight = (gameCells: GameCellType[]): GameData => {
  const groupedCellsArrays = getGroupedCells(gameCells, 'z', 'x')
  return getUpdatedGame(groupedCellsArrays)
}

const areValuesDefinedAndEqual = (valueA: number, valueB: number): boolean => {
  return !!valueA && !!valueB && valueA === valueB
}

const getGroupedCells = (
  gameCells: GameCellType[],
  coordToGroup: Coordinate,
  coordToSort: Coordinate
): GameCellType[][] => {
  const groupedCellsArrays = gameCells.reduce((cellRows: GameCellType[][], currentCell: GameCellType) => {
    const rowIndex = cellRows.findIndex(
      (cellRow: GameCellType[]) => cellRow[0][coordToGroup] === currentCell[coordToGroup]
    )

    if (rowIndex !== -1) {
      cellRows[rowIndex].push(currentCell)
    } else {
      cellRows.push([currentCell])
    }

    return cellRows
  }, [])
  return groupedCellsArrays.map((groupedCells) =>
    groupedCells.sort((cellA: GameCellType, cellB: GameCellType) => cellB[coordToSort] - cellA[coordToSort])
  )
}

const getUpdatedGame = (groupedCellsArrays: GameCellType[][]): GameData => {
  let accumulatedScore = 0
  const updatedGroupedCellsArrays = JSON.parse(JSON.stringify(groupedCellsArrays))
  for (const groupedCells of groupedCellsArrays) {
    let cellsValues = groupedCells.reduce((cellsValues: number[], currentCell: GameCellType) => {
      if (currentCell.value) {
        cellsValues.push(currentCell.value)
      }

      return cellsValues
    }, [])

    for (let valueIndex = 0; valueIndex < cellsValues.length - 1; valueIndex++) {
      if (areValuesDefinedAndEqual(cellsValues[valueIndex], cellsValues[valueIndex + 1])) {
        const sum = (cellsValues[valueIndex] || 0) + (cellsValues[valueIndex + 1] || 0)
        accumulatedScore = accumulatedScore + sum
        cellsValues[valueIndex] = sum
        cellsValues[valueIndex + 1] = 0
      }
    }

    cellsValues = cellsValues.filter((value) => !!value)
    const numberOfUndefinedCells = groupedCells.length - cellsValues.length

    cellsValues = cellsValues.concat(Array(numberOfUndefinedCells).fill(0))

    for (let cellIndex = 0; cellIndex < groupedCells.length; cellIndex++) {
      groupedCells[cellIndex].value = cellsValues[cellIndex]
    }
  }

  const hasValidMovements = canMove(updatedGroupedCellsArrays.flat(), groupedCellsArrays.flat())

  return { gameCells: groupedCellsArrays.flat(), score: accumulatedScore, hasValidMovements }
}

const canMove = (updatedGroupedCellsArrays: GameCellType[], groupedCellsArrays: GameCellType[]): boolean => {
  for (let updatedCelIndex = 0; updatedCelIndex < updatedGroupedCellsArrays.length; updatedCelIndex++) {
    if (updatedGroupedCellsArrays[updatedCelIndex].value !== groupedCellsArrays[updatedCelIndex].value) {
      return true
    }
  }

  return false
}

export const DIRECTION_KEYS: { [keyboardCode: string]: DirectionKey } = {
  KeyW: {
    directionName: 'North (top)',
    key: 'W',
    handler: (gameCells) => moveUp(gameCells),
  },
  KeyE: {
    directionName: 'North-East (top-right)',
    key: 'E',
    handler: (gameCells) => moveTopRight(gameCells),
  },
  KeyQ: {
    directionName: 'North-West (top-left)',
    key: 'Q',
    handler: (gameCells) => moveTopLeft(gameCells),
  },
  KeyS: {
    directionName: 'South (bottom)',
    key: 'S',
    handler: (gameCells) => moveBottom(gameCells),
  },
  KeyD: {
    directionName: 'South-East (bottom-right)',
    key: 'D',
    handler: (gameCells) => moveBottomRight(gameCells),
  },
  KeyA: {
    directionName: 'South-West (bottom-left)',
    key: 'A',
    handler: (gameCells) => moveBottomLeft(gameCells),
  },
}

export const getIsGameOver = (updatedGroupedCellsArrays: GameCellType[]): boolean => {
  const updatedGroupedCellsArraysCopy = JSON.parse(JSON.stringify(updatedGroupedCellsArrays))
  for (const possibleDirectionMove in DIRECTION_KEYS) {
    const { hasValidMovements } = DIRECTION_KEYS[possibleDirectionMove].handler(updatedGroupedCellsArraysCopy)
    if (hasValidMovements) {
      return false
    }
  }

  return true
}

export const isSameCell = (cellA: GameCellType, cellB: GameCellType) =>
  cellA.x === cellB.x && cellA.y === cellB.y && cellA.z === cellB.z

export const determineCellPosition = (
  cell: GameCellType,
  hexagonSize: number,
  triangleBase: number,
  triangleHeight: number,
  radius: number
) => {
  const { x, y, z } = cell
  const initialLeft = hexagonSize * radius
  const initialTop = hexagonSize * 2 * (radius - 1.25)

  if (x === 0 && y === 0 && z === 0) {
    return {
      left: initialLeft,
      top: initialTop,
    }
  }

  if (x === 0) {
    const topVariance = -y * triangleBase

    return {
      left: initialLeft,
      top: initialTop + topVariance,
    }
  }

  const leftVariance = x * (2 * hexagonSize - triangleHeight)
  const topVarianceCorrectionFactor = z > y ? Math.abs(y - z) * 0.5 : -Math.abs(y - z) * 0.5
  const topVariance = triangleBase * topVarianceCorrectionFactor

  return {
    left: initialLeft + leftVariance,
    top: initialTop + topVariance,
  }
}
