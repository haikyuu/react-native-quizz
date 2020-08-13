import * as React from 'react'
import TouchableScale from 'react-native-touchable-scale'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import {
  Text,
  StyleSheet,
  StyleProp,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  Share,
  View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { human } from 'react-native-typography'
import { SharedElement } from 'react-navigation-shared-element'
import { LinearGradient } from 'expo-linear-gradient'
import { categoryImages } from '../utils/categories'

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
    image: categoryImages.games.source,
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
        height: categoryImages.games.height,
        width: categoryImages.games.width,
        position: 'absolute',
        bottom: 0,
        left: 35
      }
    }
  },
  vehicles: {
    name: 'Vehicles',
    id: '28',
    image: categoryImages.vehicles.source,
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
        height: categoryImages.vehicles.height,
        width: categoryImages.vehicles.width,
        position: 'absolute',
        bottom: 0,
        left: 35
      }
    }
  },
  music: {
    name: 'Music',
    id: '12',
    image: categoryImages.music.source,
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
        height: categoryImages.music.height,
        width: categoryImages.music.width,

        position: 'absolute',
        bottom: 0,
        left: 25
      }
    }
  },
  animals: {
    name: 'Animals',
    id: '27',
    image: categoryImages.animals.source,
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
        height: categoryImages.animals.height,
        width: categoryImages.animals.width,
        position: 'absolute',
        right: 0,
        bottom: 0
      }
    }
  },
  random: {
    name: 'Random',
    id: 'mixed',
    image: categoryImages.random.source,
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
        height: categoryImages.random.height,
        width: categoryImages.random.width,
        position: 'absolute',
        bottom: 0,
        left: 35
      }
    }
  }
}
type CategoryProps = {
  style?: StyleProp<ViewStyle>
  name: extendedCategoryName
  onPress: (id: string, categoryName: extendedCategoryName) => void
  isQuizzContainer?: boolean
}
const Category: React.FunctionComponent<CategoryProps> = ({
  style,
  name: categoryName,
  onPress,
}: CategoryProps) => {
  const {
    image,
    name,
    id,
    styles: { container, image: imageStyle }
  } = React.useMemo(() => popularCategories[categoryName], [categoryName])
  return (
    <TouchableScale onPress={() => onPress(id, categoryName)}>
      <View style={container}>
        <Text style={[human.title2, s.title]}>{name}</Text>
        <SharedElement id={categoryName} style={imageStyle}>
          <Image style={imageStyle} source={image} />
        </SharedElement>
      </View>
    </TouchableScale>
  )
}

const s = StyleSheet.create({
  title: { color: '#fff' }
})

export default Category
