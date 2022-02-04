import React from 'react'
import { render, getByText } from '@testing-library/react'
import { GameCell } from './'

describe('GameCell', () => {
  const defaultProps = {
    x: 0,
    y: 0,
    z: 0,
  }
  test('should render without errors and match snapshot', () => {
    const {
      container: { firstChild },
    } = render(<GameCell {...defaultProps} value={2} />)

    expect(firstChild).toMatchSnapshot()
  })

  test('should display number 2 when value is 2', () => {
    const { container } = render(<GameCell {...defaultProps} value={2} />)

    getByText(container, 2)
  })

  test('should not display any number when value is 0', () => {
    const { queryByText } = render(<GameCell {...defaultProps} value={0} />)

    expect(queryByText(0)).not.toBeInTheDocument()
  })
})
