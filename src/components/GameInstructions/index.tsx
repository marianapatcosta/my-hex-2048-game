import React, { Fragment } from 'react'
import { DIRECTION_KEYS } from '../../utils'
import classes from './index.module.scss'

export const GameInstructions: React.FC = () => {
  const instructions =
    'Move the numbers in the hexagon cells towards one of the 6 possible directions, by pressing the corresponding keyboard keys. The player should match adjacent cells with the same value, so their value in summed and merged into one cell (e.g. 2 2 -> 4).  The player wins when a cell is 2048.'
  return (
    <div className={classes['game-instructions']}>
      <p>{instructions}</p>
      <div className={classes['game-instructions__directions']}>
        <h5>Direction</h5>
        <h5>Key</h5>
        {Object.values(DIRECTION_KEYS).map(({ directionName, key }) => (
          <Fragment key={`direction-${directionName}`}>
            <p>{directionName}</p>
            <kbd>{key}</kbd>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
