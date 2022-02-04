import React from 'react'
import { GameCellType } from '../../types'
import classes from './index.module.scss'

export const GameCell: React.FC<GameCellType> = ({ x, y, z, value, style }) => {
  return (
    <div className={classes['game-cell']} data-x={x} data-y={y} data-z={z} data-value={value} style={style}>
      <div
        className={`${classes['game-cell']} ${classes['game-cell--inner']}`}
        data-x={x}
        data-y={y}
        data-z={z}
        data-value={value}
        style={style}
      >
        {!!value && <span>{value}</span>}
      </div>
    </div>
  )
}
