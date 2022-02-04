import React, { ChangeEvent, CSSProperties, useCallback, useEffect, useState } from 'react'
import { GameCell, GameInstructions } from '..'
import { useHexagonDimensions } from '../../hooks/useHexagonDimensions'
import { GameCellType } from '../../types'
import { GAME_STATUSES, GRID_COORDS, HEXAGON_COLORS } from '../../constants'
import { determineCellPosition, DIRECTION_KEYS, getIsGameOver, isSameCell } from '../../utils'
import classes from './index.module.scss'
import { getGameDataFromServer } from '../../api/getGameDataFromServer'

const BASE_URL = 'https://hex2048szb9jquj-hex15.functions.fnc.fr-par.scw.cloud'

export const GameBoard: React.FC = () => {
  const [radius, setRadius] = useState<number>(2)
  const { hexagonSize, triangleBase, triangleHeight, numberOfHexagons } = useHexagonDimensions(radius)

  const getGameCells = () => {
    const gameCells: GameCellType[] = GRID_COORDS.slice(0, numberOfHexagons).map(([x, y, z]) => ({ x, y, z, value: 0 }))
    return gameCells
  }

  const [gameCells, setGameCells] = useState<GameCellType[]>([])
  const [gameStatus, setGameStatus] = useState<GAME_STATUSES>(GAME_STATUSES.PLAYING)
  const [score, setScore] = useState<number>(0)

  const gameCellCssProps = {
    '--hexagon-size': hexagonSize,
    '--triangle-base': triangleBase,
    '--triangle-height': triangleHeight,
  } as CSSProperties

  const checkWin = useCallback((updatedGameCells: GameCellType[]) => {
    const hasWon = updatedGameCells.some((cell) => cell.value === 2048)
    if (hasWon) {
      setGameStatus(GAME_STATUSES.WIN)
    }
  }, [])

  const checkGameOver = useCallback((updatedGameCells: GameCellType[]) => {
    const isGameOver = getIsGameOver(updatedGameCells)
    if (isGameOver) {
      setGameStatus(GAME_STATUSES.OVER)
    }
  }, [])

  const onGetDataSuccess = (newServerCellsData: GameCellType[], newGameCells: GameCellType[]) => {
    const updatedGameCells: GameCellType[] = newGameCells.map((gameCell) => {
      const newCell = newServerCellsData.find((newCell) => isSameCell(gameCell, newCell))

      if (newCell) {
        return newCell
      }
      return gameCell
    })

    setGameCells(updatedGameCells)
  }

  const getGameData = useCallback(
    async (newGameCells?: GameCellType[]) => {
      const cells = newGameCells || gameCells

      const data = await getGameDataFromServer(
        `${BASE_URL}/${radius}`,
        cells.filter((cell) => !!cell.value)
      )

      if (!data?.length) {
        setGameStatus(GAME_STATUSES.OVER)
      }

      !!data && onGetDataSuccess(data, cells)
    },
    [gameCells, radius]
  )

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!Object.keys(DIRECTION_KEYS).includes(event.code)) {
        return
      }
      const { gameCells: updatedGameCells, score, hasValidMovements } = DIRECTION_KEYS[event.code].handler(gameCells)
      if (!hasValidMovements) {
        return
      }

      setGameCells(updatedGameCells)
      checkWin(updatedGameCells)
      checkGameOver(updatedGameCells)
      getGameData(updatedGameCells)
      setScore((currentScore) => currentScore + score)
    },
    [gameCells, checkWin, checkGameOver, getGameData]
  )

  const getCellStyle = (cell: GameCellType): CSSProperties => {
    const { left, top } = determineCellPosition(cell, hexagonSize, triangleBase, triangleHeight, radius)
    const cssProps = {
      ...gameCellCssProps,
      '--left': left,
      '--top': top,
      '--background-color': HEXAGON_COLORS[cell.value].backgroundColor,
      '--color': HEXAGON_COLORS[cell.value].color || '#FFFFFF',
    }
    return cssProps
  }

  const resetGame = () => {
    const newCells = getGameCells()
    setGameCells(newCells)
    setScore(0)
    setGameStatus(GAME_STATUSES.PLAYING)
    getGameData(newCells)
  }

  const onChangeRadius = (event: ChangeEvent<HTMLInputElement>) => {
    setRadius(+event.target.value)
  }

  useEffect(() => {
    resetGame()
  }, [radius])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  useEffect(() => {
    if (gameStatus !== GAME_STATUSES.PLAYING) {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [gameStatus, onKeyDown])

  return (
    <div className={classes['game-board']} data-testid='game-board'>
      <div className={classes['game-board__header']}>
        <span>
          Status: <span data-status={gameStatus}>{gameStatus}</span>
        </span>
        <span>
          Score: <span>{score}</span>
        </span>
        <span className={classes['game-board__radius']}>
          <label htmlFor='radius'>
            Radius <span>{radius}</span>
          </label>
          <input id='radius' type='range' min='2' max='4' value={radius} required onChange={onChangeRadius} />
        </span>
        <button onClick={resetGame}>reset</button>
      </div>
      <details className={classes['game-board__instructions']}>
        <summary className={classes['game-board__instructions-title']}>How to play?</summary>
        <GameInstructions />
      </details>
      <div className={classes['game-board__main']}>
        <div className={classes['game-board__playground']}>
          {gameCells.map((cell, index) => (
            <GameCell key={`cell-x${index}`} {...cell} style={getCellStyle(cell)} />
          ))}
        </div>
        <div className={`${classes['game-board__instructions']} ${classes['game-board__instructions--desktop']}`}>
          <p className={classes['game-board__instructions-title']}>How to play?</p>
          <GameInstructions />
        </div>
      </div>
    </div>
  )
}
