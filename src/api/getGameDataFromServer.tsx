import axios from 'axios'
import { GameCellType } from '../types'

export const getGameDataFromServer = async (url: string, newGameCells: GameCellType[]): Promise<GameCellType[] | undefined> => {
  try {
    const response = await axios.post(
      url,
      newGameCells.filter((cell) => !!cell.value)
    )
    return response?.data as GameCellType[]
  } catch (error) {
    alert('An error occurred!')
  }
}
