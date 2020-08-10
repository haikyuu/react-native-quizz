import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undedfined;
    Quizz: undefined;
    Results: undefined;
};

type ScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

