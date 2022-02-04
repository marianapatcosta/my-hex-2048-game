import { useHexagonDimensions } from './useHexagonDimensions'

describe('useHexagonDimensions', () => {
  const baseURL = window.location.href
  
  test('should return the corresponding hexagon dimensions if radius is 2', () => {
    window.history.replaceState('', '', `${baseURL}?hostname=localhost&port=8080&radius=4`)
    const useHexagonDimensionsResult = useHexagonDimensions(2)
    expect(useHexagonDimensionsResult).toEqual({
      hexagonSize: 5,
      triangleBase: 8.660254037844386,
      triangleHeight: 2.5000000000000004,
      numberOfHexagons: 7,
    })
  })
})
