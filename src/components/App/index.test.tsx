import React from 'react'
import { render } from '@testing-library/react'
import { App } from './'

describe('App', () => {
  test('should render without errors and match snapshot', () => {
    const {
      container: { firstChild },
    } = render(<App />)

    expect(firstChild).toMatchSnapshot()
  })


  test('should render `Game Board` component', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('game-board')).toBeInTheDocument()
  })
})
