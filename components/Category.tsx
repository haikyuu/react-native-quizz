import * as React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Text, StyleSheet, StyleProp } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

type extendedCategoryName = popularCategory | 'random'
const popularCategories: Record<
  extendedCategoryName,
  {
    name: string
    id: string
    icon: string
    family?: 'ant'
  }
> = {
  games: {
    name: 'Video Games',
    id: '15',
    icon: 'gamepad-variant-outline'
  },
  vehicles: { name: 'Vehicles', id: '28', icon: 'car' },
  music: { name: 'Music', id: '12', icon: 'music' },
  animals: { name: 'Animals', id: '27', icon: 'dog' },
  random: {
    name: 'Random Category',
    id: 'mixed',
    icon: 'question',
    family: 'ant'
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
  const { icon, name, id, family } = React.useMemo(
    () => popularCategories[categoryName],
    [categoryName]
  )
  const Icon = family === 'ant' ? AntDesign : MaterialCommunityIcons
  return (
    <TouchableOpacity style={[s.container, style]} onPress={() => onPress(id)}>
      <Icon name={icon} size={24} color='black' style={s.icon} />
      <Text style={s.title}>{name}</Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  container: {},
  title: {},
  icon: {}
})

export default Category
