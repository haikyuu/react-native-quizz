import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

export const categoryImages: Record<
  extendedCategoryName,
  {
    source: ImageSourcePropType;
    width: number;
    height: number;
  }
> = {
  music: {
    source: require("../assets/images/bird.png"),
    width: 100,
    height: 81.8,
  },
  random: {
    source: require("../assets/images/flying.png"),
    height: 79,
    width: 79,
  },
  vehicles: {
    source: require("../assets/images/stack.png"),
    width: 71,
    height: 123.8,
  },
  animals: {
    source: require("../assets/images/group.png"),
    width: 187,
    height: 107,
  },
  games: {
    source: require("../assets/images/bunny.png"),
    height: 90,
    width: 79,
  },
};

export const popularCategories: Record<
  extendedCategoryName,
  {
    name: string;
    id: string;
    image: ImageSourcePropType;
    styles: {
      container: StyleProp<ViewStyle>;
      image: StyleProp<ImageStyle>;
    };
  }
> = {
  games: {
    name: "Video Games",
    id: "15",
    image: categoryImages.games.source,
    styles: {
      container: {
        width: 150,
        height: 180,
        borderRadius: 25,
        backgroundColor: "#3ed598",
        paddingTop: 24,
        alignItems: "center",
      },
      image: {
        height: categoryImages.games.height,
        width: categoryImages.games.width,
        position: "absolute",
        bottom: 0,
        left: 35,
      },
    },
  },
  vehicles: {
    name: "Vehicles",
    id: "28",
    image: categoryImages.vehicles.source,
    styles: {
      container: {
        width: 150,
        height: 209.8,
        borderRadius: 25,
        backgroundColor: "#ff565e",
        paddingTop: 24,
        alignItems: "center",
      },
      image: {
        height: categoryImages.vehicles.height,
        width: categoryImages.vehicles.width,
        position: "absolute",
        bottom: 0,
        left: 35,
      },
    },
  },
  music: {
    name: "Music",
    id: "12",
    image: categoryImages.music.source,
    styles: {
      container: {
        width: 150,
        height: 210,
        borderRadius: 25,
        backgroundColor: "#ffc542",
        paddingTop: 24,
        alignItems: "center",
      },
      image: {
        height: categoryImages.music.height,
        width: categoryImages.music.width,

        position: "absolute",
        bottom: 0,
        left: 25,
      },
    },
  },
  animals: {
    name: "Animals",
    id: "27",
    image: categoryImages.animals.source,
    styles: {
      container: {
        height: 180,
        width: "100%",
        borderRadius: 25,
        backgroundColor: "#ff565e",
        paddingTop: 24,
        paddingLeft: 24,
      },
      image: {
        height: categoryImages.animals.height,
        width: categoryImages.animals.width,
        position: "absolute",
        right: 0,
        bottom: 0,
      },
    },
  },
  random: {
    name: "Random",
    id: "mixed",
    image: categoryImages.random.source,
    styles: {
      container: {
        width: 150,
        height: 150,
        borderRadius: 25,
        backgroundColor: "#3ed598",
        paddingTop: 24,
        alignItems: "center",
      },
      image: {
        height: categoryImages.random.height,
        width: categoryImages.random.width,
        position: "absolute",
        bottom: 0,
        left: 35,
      },
    },
  },
};
