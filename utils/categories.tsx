import { ImageSourcePropType } from 'react-native'

export const categoryImages: Record<
  extendedCategoryName,
  {
    source: ImageSourcePropType
    width: number
    height: number
  }
> = {
  music: {
    source: require('../assets/images/bird.png'),
    width: 100,
    height: 81.8
  },
  random: {
    source: require('../assets/images/flying.png'),
    height: 79,
    width: 79
  },
  vehicles: {
    source: require('../assets/images/stack.png'),
    width: 71,
    height: 123.8
  },
  animals: {
    source: require('../assets/images/group.png'),
    width: 187,
    height: 107
  },
  games: {
    source: require('../assets/images/bunny.png'),
    height: 90,
    width: 79
  }
}
