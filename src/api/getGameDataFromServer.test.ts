import axios, { AxiosResponse } from 'axios'
import { getGameDataFromServer } from './getGameDataFromServer'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getGameDataFromServer', () => {
  const url = 'http://localhost:8080/2'
  const gameCells = [
    { x: -1, y: 1, z: 0, value: 2 },
    { x: -1, y: 0, z: 1, value: 0 },
    { x: 0, y: 1, z: -1, value: 2 },
    { x: 0, y: 0, z: 0, value: 0 },
    { x: 0, y: -1, z: 1, value: 4 },
    { x: 1, y: 0, z: -1, value: 0 },
    { x: 1, y: -1, z: 0, value: 2 },
  ]
  const serverResponseCells = [
    { x: -1, y: 1, z: 0, value: 2 },
    { x: -1, y: 0, z: 1, value: 2 },
    { x: 0, y: 1, z: -1, value: 2 },
  ]

  test('should returned an array of game cells, on request success', async () => {
    const mockedResponse = {
      data: serverResponseCells,
    } as AxiosResponse
    mockedAxios.post.mockResolvedValueOnce(Promise.resolve(mockedResponse))
    const response = await getGameDataFromServer(url, gameCells)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(response).toEqual(serverResponseCells)
  })

  test('should returned an array of game cells, on request error', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    mockedAxios.post.mockRejectedValue(new Error('BAD REQUEST'))
    await getGameDataFromServer(url, gameCells)
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
})
