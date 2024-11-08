import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useContext } from "react";
import Context from "./Context";
import "./gesture-handler";
import logo from "./assets/logo.png";

import SignupScreen from "./Screens/Authentication/SignupScreen";
import SigninScreen from "./Screens/Authentication/SigninScreen";

import HomeScreen from "./Screens/HomeScreen";
import PropertyScreen from "./Screens/PropertyScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import TourRequestsScreen from "./Screens/TourRequestsScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const { logout, user } = useContext(Context);

  const handleNavigation = (screen) => {
    navigation.closeDrawer();
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.userInfoSection}>
        <Image
          source={require("./assets/hazodeh.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <DrawerContentScrollView bounces={false} style={styles.drawerContent}>
        <DrawerItem
          label="My Profile"
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={() => <Ionicons name="person" size={24} color="#fff" />}
          onPress={() => handleNavigation("Profile")}
        />
        <DrawerItem
          label="Requested Tours"
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
          icon={() => <Ionicons name="eye" size={24} color="#fff" />}
          onPress={() => handleNavigation("TourRequests")}
        />
        <DrawerItem
          label="Rent History"
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={() => <Ionicons name="time" size={24} color="#fff" />}
          onPress={() => {
            navigation.closeDrawer();
            Alert.alert("Unavailable", "This screen is not ready yet.");
          }}
        />
        <DrawerItem
          label="Become a Renter"
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
          icon={() => <Ionicons name="key" size={24} color="#fff" />}
          onPress={() => {
            navigation.closeDrawer();
            Alert.alert("Unavailable", "This screen is not ready yet.");
          }}
        />
        <DrawerItem
          label="Help"
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={() => <Ionicons name="help-circle" size={24} color="#fff" />}
          onPress={() => {
            navigation.closeDrawer();
            Alert.alert("Unavailable", "This screen is not ready yet.");
          }}
        />
      </DrawerContentScrollView>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>

      <View style={styles.logoutSection}>
        <DrawerItem
          label="Settings"
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={() => <Ionicons name="settings" size={27} color="#fff" />}
          onPress={() => {
            navigation.closeDrawer();
            Alert.alert("Unavailable", "This screen is not ready yet.");
          }}
        />
        <DrawerItem
          label="Logout"
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={() => (
            <Ionicons name="log-out-outline" size={27} color="#fff" />
          )}
          onPress={() => {
            navigation.closeDrawer();
            logout();
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#508D4E",
        },
        headerTintColor: "#fff",
        drawerStyle: {
          backgroundColor: "#508D4E",
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerItemStyle: {
          paddingVertical: 5,
        },
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          headerTitle: () => (
            <Image
              source={logo}
              style={{ height: 20, resizeMode: "contain" }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => alert("Notifications")}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="notifications" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { isAuthenticated } = useContext(Context);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#508D4E",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={24} color={color} />
            ),
            title: "My profile",
          }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyScreen}
          options={{
            title: "Property Details",
          }}
        />
        <Stack.Screen
          name="TourRequests"
          component={TourRequestsScreen}
          options={{
            title: "Tour Requests",
          }}
        />
        {!isAuthenticated && (
          <>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: "#508D4E",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  drawerContent: {
    padding: 0,
  },
  drawerItem: {
    paddingLeft: 10,
  },
  drawerItemLabel: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  separatorContainer: {
    width: "100%",
    alignItems: "center",
  },
  separator: {
    backgroundColor: "white",
    width: "90%",
    height: 1,
  },
  logoutSection: {
    paddingVertical: 20,
  },
});
