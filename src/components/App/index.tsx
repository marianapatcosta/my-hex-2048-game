import React from 'react'
import { GameBoard } from '..'
import Logo from '../../assets/hex-2048-logo.svg'
import './index.module.scss'

export const App: React.FC = () => {
  return (
    <>
      <header>
        <h2>
          Hex <img src={Logo} alt='hex 2048 logo' />
        </h2>
      </header>
      <main>
        <GameBoard />
      </main>
    </>
  )
}
