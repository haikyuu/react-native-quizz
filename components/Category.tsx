import * as React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import {
  Text,
  StyleSheet,
  StyleProp,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { human } from 'react-native-typography'

type extendedCategoryName = popularCategory | 'random'
const popularCategories: Record<
  extendedCategoryName,
  {
    name: string
    id: string
    image: ImageSourcePropType
    styles: {
      container: StyleProp<ViewStyle>
      image: StyleProp<ImageStyle>
    }
  }
> = {
  games: {
    name: 'Video Games',
    id: '15',
    image: require('../assets/images/bunny.png'),
    styles: {
      container: {
        width: 150,
        height: 180,
        borderRadius: 25,
        backgroundColor: '#3ed598',
        paddingTop: 24,
        alignItems: 'center'
      },
      image: {
        height: 90,
        width: 79,
        position: 'absolute',
        bottom: 0,
        left: 35
      }
    }
  },
  vehicles: {
    name: 'Vehicles',
    id: '28',
    image: require('../assets/images/stack.png'),
    styles: {
      container: {
        width: 150,
        height: 209.8,
        borderRadius: 25,
        backgroundColor: '#ff565e',
        paddingTop: 24,
        alignItems: 'center'
      },
      image: {
        width: 71,
        height: 123.8,
        position: 'absolute',
        bottom: 0,
        left: 35
      }
    }
  },
  music: {
    name: 'Music',
    id: '12',
    image: require('../assets/images/bird.png'),
    styles: {
      container: {
        width: 150,
        height: 210,
        borderRadius: 25,
        backgroundColor: '#ffc542',
        paddingTop: 24,
        alignItems: 'center'
      },
      image: {
        width: 100,
        height: 81.8,
        position: 'absolute',
        bottom: 0,
        left: 25
      }
    }
  },
  animals: {
    name: 'Animals',
    id: '27',
    image: require('../assets/images/group.png'),
    isLarge: true,
    styles: {
      container: {
        height: 180,
        width: '100%',
        borderRadius: 25,
        backgroundColor: '#ff565e',
        paddingTop: 24,
        paddingLeft: 24
      },
      image: {
        width: 187,
        height: 107,
        position: 'absolute',
        right: 0,
        bottom: 0
      }
    }
  },
  random: {
    name: 'Random',
    id: 'mixed',
    image: require('../assets/images/flying.png'),
    styles: {
      container: {
        width: 150,
        height: 150,
        borderRadius: 25,
        backgroundColor: '#3ed598',
        paddingTop: 24,
        alignItems: 'center'
      },
      image: {
        height: 79,
        width: 79,
        position: 'absolute',
        bottom: 0,
        left: 35
      }
    }
  }
}
type CategoryProps = {
  style?: StyleProp<TouchableOpacity>
  name: extendedCategoryName
  onPress: (id: string) => void
}
const Category: React.FunctionComponent<CategoryProps> = ({
  style,
  name: categoryName,
  onPress
}: CategoryProps) => {
  const {
    image,
    name,
    id,
    styles: { container, image: imageStyle }
  } = React.useMemo(() => popularCategories[categoryName], [categoryName])
  return (
    <TouchableOpacity style={[container, style]} onPress={() => onPress(id)}>
      <Text style={[human.title3, s.title]}>{name}</Text>
      <Image style={imageStyle} source={image} />
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  title: { color: '#fff' }
})

export default Category
