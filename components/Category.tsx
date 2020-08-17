import * as React from "react";
import TouchableScale from "react-native-touchable-scale";
import {
  Text,
  StyleSheet,
  StyleProp,
  Image,
  ViewStyle,
  View,
} from "react-native";
import { human } from "react-native-typography";
import { SharedElement } from "react-navigation-shared-element";
import { popularCategories } from "../utils/categories";
import { useDispatch } from "react-redux";
import { Dispatch } from "../store";

type CategoryProps = {
  style?: StyleProp<ViewStyle>;
  name: extendedCategoryName;
  onPress: (id: string, categoryName: extendedCategoryName) => void;
  isQuizzContainer?: boolean;
};
const Category: React.FunctionComponent<CategoryProps> = ({
  name: categoryName,
  onPress,
}: CategoryProps) => {
  const {
    image,
    name,
    id,
    styles: { container, image: imageStyle },
  } = React.useMemo(() => popularCategories[categoryName], [categoryName]);
  const dispatch = useDispatch<Dispatch>();
  return (
    <TouchableScale
      onPress={() => {
        onPress(id, categoryName);
        dispatch.settings.playClickSound();
      }}
    >
      <View style={[container, { overflow: "hidden" }]}>
        <Text style={[human.title2, s.title]}>{name}</Text>
        <SharedElement id={categoryName} style={imageStyle}>
          <Image style={imageStyle} source={image} />
        </SharedElement>
      </View>
    </TouchableScale>
  );
};

const s = StyleSheet.create({
  title: { color: "#fff", fontWeight: "500" },
});

export default Category;
