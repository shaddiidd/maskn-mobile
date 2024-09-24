import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./Screens/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import './gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PropertyScreen from './Screens/PropertyScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#508D4E',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: () => (
          <Image
            source={logo}
            style={{ height: 20, resizeMode: 'contain' }}
          />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => alert('Notifications')} style={{ marginRight: 15 }}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        ),
        drawerStyle: {
          backgroundColor: '#508D4E',
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
}


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#508D4E',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyScreen}
          options={{
            title: "Property Details"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}