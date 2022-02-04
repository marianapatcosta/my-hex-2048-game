import React from 'react'
import { render } from '@testing-library/react'
import { GameInstructions } from './'

describe('GameInstructions', () => {
  test('should render without errors and match snapshot', () => {
    const {
      container: { firstChild },
    } = render(<GameInstructions />)

    expect(firstChild).toMatchSnapshot()
  })
})
