# Hexagonal 2048

Hexagonal version of the popular 2048 game developed with React, TypeScript and SCSS-modules; includes unit tests. This game has has different levels, as the player can choose the number of hexagons to display. The game ends when the uscoverer wins (i.e. a hexagon cell has a value of 2048) or when there are no more possible moves.

![hex-2048-game](https://user-images.githubusercontent.com/43031902/152609915-1c64e5f4-ee85-4b6f-adc4-81cf11691bb3.png)


## How to Play
Move the numbers in the hexagon cells towards one of the 6 possible directions, by pressing the corresponding keyboard keys (see the table below). The player should match adjacent cells with the same value, so their value in summed and merged into one cell (e.g. 2 2 -> 4). The player wins when a cell has 2048 as a value. These are the available command keys:

| Direction                 | Keyboard key |
| ------------------------- | :----------: |
| north (top)               |      w       |
| north-east (top-right)    |      e       |
| north-west (top-left)     |      q       |
| south (bottom)            |      s       |
| south-east (bottom-right) |      d       |
| south-west (bottom-left)  |      a       |

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test:unit`

Launches the unit test runner in the interactive watch mode.
### `yarn test-coverage:unit`

Launches the unit test runner in the interactive watch mode and shows tets coverage report.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

