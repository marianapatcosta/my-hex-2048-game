import { HexagonColors } from "./types"

export enum GAME_STATUSES {
  PLAYING = 'playing',
  OVER = 'game-over',
  WIN = 'win',
}

export const GRID_COORDS = [
  [0, 0, 0],
  [1, 0, -1],
  [1, -1, 0],
  [0, -1, 1],
  [-1, 0, 1],
  [-1, 1, 0],
  [0, 1, -1],

  [0, 2, -2],
  [1, 1, -2],
  [2, 0, -2],
  [2, -1, -1],
  [2, -2, 0],
  [1, -2, 1],
  [0, -2, 2],
  [-1, -1, 2],
  [-2, 0, 2],
  [-2, 1, 1],
  [-2, 2, 0],
  [-1, 2, -1],

  [0, 3, -3],
  [1, 2, -3],
  [2, 1, -3],
  [3, 0, -3],
  [3, -1, -2],
  [3, -2, -1],
  [3, -3, 0],
  [2, -3, 1],
  [1, -3, 2],
  [0, -3, 3],
  [-1, -2, 3],
  [-2, -1, 3],
  [-3, 0, 3],
  [-3, 1, 2],
  [-3, 2, 1],
  [-3, 3, 0],
  [-2, 3, -1],
  [-1, 3, -2],
]

export const HEXAGON_COLORS: HexagonColors = {
  0: { backgroundColor: '#FFFFFF', color: '#555555' },
  2: { backgroundColor: '#F0E4D8', color: '#555555' },
  4: { backgroundColor: '#EEE0C6', color: '#555555' },
  8: { backgroundColor: '#EFAF79' },
  16: { backgroundColor: '#E58D53' },
  32: { backgroundColor: '#F97B5B' },
  64: { backgroundColor: '#FF3C42' },
  128: { backgroundColor: '#ECC962' },
  256: { backgroundColor: '#EBC94C' },
  512: { backgroundColor: '#EEC341' },
  1024: { backgroundColor: '#ECC22E' },
  2048: { backgroundColor: '#edc22e' },
}
