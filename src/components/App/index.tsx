import React from 'react'
import { GameBoard } from '..'
import './index.module.scss'

export const App: React.FC = () => {
  return (
    <>
      <header>
        <h2>
          Hex <img src='/hex-2048-logo.svg' alt='hex 2048 logo' />
        </h2>
      </header>
      <main>
        <GameBoard />
      </main>
    </>
  )
}
