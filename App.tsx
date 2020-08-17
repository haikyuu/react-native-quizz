import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Quizz from "./screens/Quizz";
import Results from "./screens/Results";
import { RootStackParamList } from "./types/navigation";
import { Provider } from "react-redux";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import store from "./store";
import { human } from "react-native-typography";
import HeaderRight from "./components/HeaderRight";
type AppProps = Record<string, unknown>;

const Stack = createSharedElementStackNavigator<RootStackParamList>();
const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: "Trivia",
            headerTintColor: "white",
            // eslint-disable-next-line react/display-name
            headerRight: ({ tintColor }: { tintColor?: string }) => (
              <HeaderRight
                tintColor={tintColor}
                toggleMusic={store.dispatch.settings.toggleMusic}
              />
            ),
            headerTitleStyle: human.title2White,
            headerStyle: {
              backgroundColor: "#4b6cb7",
              borderBottomWidth: 0,
              shadowRadius: 0,
              shadowOffset: {
                height: 0,
                width: 0,
              },
            },
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Quizz"
            component={Quizz}
            sharedElementsConfig={(route) => {
              const { category } = route.params;
              return [category];
            }}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={{
              headerTitleStyle: human.title2,
              headerStyle: { backgroundColor: "#ffc542" },
              headerTintColor: "black",
              headerLeft: () => null,
            }}
            sharedElementsConfig={() => {
              return undefined;
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
