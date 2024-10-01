import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./Navigation";
import Provider from "./Provider";
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <Provider>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </Provider>
  );
}