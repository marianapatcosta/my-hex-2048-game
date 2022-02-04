import { HexagonDimensions } from "../types";

export const useHexagonDimensions = (radius: number): HexagonDimensions => {
  const hexagonSize = 10 / radius;

  // the hexagon is composed of a rectangle with height equals to hexagon hexagonSize and two isosceles triangles
  // Measurements were calculated base on the assumptions stated in the attached image 'hexagon-trigonometry.png'
  const sixtyDegreesInRadians = degreesToRadian(60);
  const triangleBase = 2 * (hexagonSize * Math.sin(sixtyDegreesInRadians));
  const triangleHeight = hexagonSize * Math.cos(sixtyDegreesInRadians);
  const numberOfHexagons = getNumberHexagonsInTheGrid(radius);
  return { hexagonSize, triangleBase, triangleHeight, numberOfHexagons };
};

const degreesToRadian = (angleInDegrees: number): number => {
  // 180 Degrees = π Radians
  return (angleInDegrees * Math.PI) / 180;
};

const getNumberHexagonsInTheGrid = (radius: number): number => {
  // centered hexagonal number formula: 3n^2 - 3n + 1
  return 3 * Math.pow(radius, 2) - 3 * radius + 1;
};
