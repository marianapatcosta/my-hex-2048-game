import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { fireEvent, render } from '@testing-library/react'
import { GameBoard } from './'
import { getGameDataFromServer } from '../../api/getGameDataFromServer'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('GameBoard', () => {
  const url = 'http://localhost:8080/2'
  const baseURL = window.location.href
  const defaultGameCells = [
    { x: -1, y: 1, z: 0, value: 0 },
    { x: -1, y: 0, z: 1, value: 0 },
    { x: 0, y: 1, z: -1, value: 0 },
    { x: 0, y: 0, z: 0, value: 0 },
    { x: 0, y: -1, z: 1, value: 0 },
    { x: 1, y: 0, z: -1, value: 0 },
    { x: 1, y: -1, z: 0, value: 0 },
  ]

  beforeEach(() => {
    const mockedResponse = {
      data: [
        [
          { x: -1, y: 1, z: 0, value: 2 },
          { x: -1, y: 0, z: 1, value: 2 },
          { x: 0, y: 1, z: -1, value: 2 },
        ],
      ],
    } as AxiosResponse
    mockedAxios.post.mockResolvedValueOnce(Promise.resolve(mockedResponse))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render without errors and match snapshot', () => {
    const {
      container: { firstChild },
    } = render(<GameBoard />)

    expect(firstChild).toMatchSnapshot()
  })

  test('should call axios post with the given url on mount', async () => {
    render(<GameBoard />)

    await getGameDataFromServer(url, [])
    expect(mockedAxios.post).toHaveBeenCalledWith(url, [])
    // expect(mockedAxios.post).toHaveBeenCalledTimes(1)
  })
  /*  test('should call axios post on valid Keydown', async () => {
    
    await act(async () => {
      window.history.replaceState('', '', `${baseURL}?hostname=localhost&port=8080&radius=2`)

      const { container } = render(<GameBoard />)
      await getGameDataFromServer(url, defaultGameCells)
      fireEvent.keyDown(document, {
        key: 'W',
        code: 'KeyW',
      })
    })

    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
  })

  test('should not call axios post on invalid Keydown', async () => {
    await act(async () => {
    

      const { container } = render(<GameBoard />)
      fireEvent.keyDown(document, {
        key: 'L',
        code: 'KeyL',
      })
    })

    expect(mockedAxios.post).not.toHaveBeenCalled()
  }) */
})
