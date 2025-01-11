import {
  createDrawerNavigator,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useContext } from "react";
import Context from "../context/Context";
import "../../gesture-handler";
import logo from "../assets/maskn-green.png";

import SignupScreen from "../screens/authentication/SignupScreen";
import SigninScreen from "../screens/authentication/SigninScreen";
import ForgotPassword from "../screens/authentication/ForgotPassword";

import HomeScreen from "../screens/HomeScreen";
import PropertyScreen from "../screens/property/PropertyScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import TourRequestsScreen from "../screens/property/TourRequestsScreen";
import RentHistory from "../screens/property/RentHistory";
import MyProperties from "../screens/property/MyProperties";
import BecomeRenter from "../screens/authentication/BecomeRenter";
import Payment from "../screens/payment/Payment";
import UtilitiesScreen from "../screens/property/UtilitiesScreen";
import NotificationsScreen from "../screens/notification/NotificationsScreen";
import PostProperty from "../screens/property/PostProperty";
import ContractScreen from "../screens/contract/ContractScreen";
import SignContract from "../screens/contract/SignContract";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import PropertySearch from "../screens/property/PropertySearch";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const { logout, user } = useContext(Context);

  const handleNavigation = (screen) => {
    navigation.closeDrawer();
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <View style={styles.userInfoSection}>
          {user?.profile_photo?.length ? (
            <Image source={{ uri: user?.profile_photo[0] }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImage}>
              <Ionicons name="person" color="#666" size={50} />
            </View>
          )}
          <Text style={styles.name}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text style={styles.userName}>@{user?.username}</Text>
        </View>

        <View style={styles.drawerContent}>
          <DrawerItem
            label="Profile"
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
            icon={() => (
              <Ionicons name="person-outline" size={24} color="#508D4E" />
            )}
            onPress={() => handleNavigation("Profile")}
          />
          <DrawerItem
            label="Tour Requests"
            labelStyle={styles.drawerItemLabel}
            style={styles.drawerItem}
            icon={() => <Ionicons name="eye-outline" size={24} color="#508D4E" />}
            onPress={() => handleNavigation("TourRequests")}
          />
          <DrawerItem
            label="Rent History"
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
            icon={() => <Ionicons name="time-outline" size={24} color="#508D4E" />}
            onPress={() => handleNavigation("RentHistory")}
          />
          {user.role === 1 ? (
            <DrawerItem
              label="Become a Renter"
              labelStyle={styles.drawerItemLabel}
              style={styles.drawerItem}
              icon={() => (
                <Ionicons name="key-outline" size={24} color="#508D4E" />
              )}
              onPress={() => handleNavigation("BecomeRenter")}
            />
          ) : (
            <DrawerItem
              label="My Properties"
              labelStyle={styles.drawerItemLabel}
              style={styles.drawerItem}
              icon={() => (
                <Ionicons name="key-outline" size={24} color="#508D4E" />
              )}
              onPress={() => handleNavigation("MyProperties")}
            />
          )}
          <DrawerItem
            label="Help"
            style={styles.drawerItem}
            labelStyle={styles.drawerItemLabel}
            icon={() => (
              <Ionicons name="help-circle-outline" size={24} color="#508D4E" />
            )}
            onPress={() => {
              navigation.closeDrawer();
              Alert.alert("Unavailable", "This screen is not ready yet.");
            }}
          />
        </View>
      </View>

      <View style={styles.logoutSection}>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </View>
        <DrawerItem
          label="Settings"
          style={styles.drawerItem}
          labelStyle={styles.drawerItemLabel}
          icon={() => (
            <Ionicons name="settings-outline" size={27} color="#508D4E" />
          )}
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
            <Ionicons name="log-out-outline" size={27} color="#508D4E" />
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
  const { isAuthenticated, showNotificationsIndicator, setShowNotificationsIndicator } = useContext(Context);
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => {
        const baseOptions = {
          headerTintColor: "#508D4E",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "600"
          },
          drawerActiveTintColor: "#508D4E",
          drawerInactiveTintColor: "#508D4E",
          drawerItemStyle: {
            paddingVertical: 5,
          },
          drawerType: "front",
          swipeEnabled: isAuthenticated,
          gestureEnabled: isAuthenticated,
        };

        if (!isAuthenticated) {
          baseOptions.headerLeft = () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Signin")}
              activeOpacity={0.7}
            >
              <Ionicons name="log-in-outline" color="#508D4E" size={24} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          );
        }

        return baseOptions;
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
              style={{ width: 200, height: 25, resizeMode: "contain" }}
            />
          ),
          headerRight: () => {
            if (!isAuthenticated) return null;
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("Notifications");
                  setShowNotificationsIndicator(false);
                }}
                style={{ marginRight: 15 }}
              >
                <View style={{ position: "relative" }}>
                  <Ionicons name="notifications-outline" size={24} color="#508D4E" />
                  {showNotificationsIndicator && (
                    <View
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        backgroundColor: "red",
                        borderRadius: 10,
                        width: 14,
                        height: 14,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          },
          headerStyle: {
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Remove the separator line
          },
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
          headerShadowVisible: false,
          headerTintColor: "#000",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
        <Stack.Screen name="PropertySearch" component={PropertySearch} options={{ title: "Search Properties", headerShadowVisible: false }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="PropertyDetails" component={PropertyScreen} options={{ title: "Property Details" }} />
        <Stack.Screen name="TourRequests" component={TourRequestsScreen} options={{ title: "Tour Requests" }} />
        <Stack.Screen name="RentHistory" component={RentHistory} options={{ title: "Rent History" }} />
        <Stack.Screen name="MyProperties" component={MyProperties} options={{ title: "My Properties" }} />
        <Stack.Screen name="PostProperty" component={PostProperty} options={{ title: "Post Property" }} />
        <Stack.Screen name="BecomeRenter" component={BecomeRenter} options={{ title: "Become a Renter" }} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Utilities" component={UtilitiesScreen} />
        <Stack.Screen name="Contract" component={ContractScreen} />
        <Stack.Screen name="SignContract" component={SignContract} options={{ title: "Sign Contract" }} />
        {!isAuthenticated && (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Signin" component={SigninScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
            <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
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
    // backgroundColor: "#508D4E",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#508D4E",
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    // color: "#508D4E",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  userName: {
    color: "#508D4E",
    fontSize: 15,
  },
  drawerContent: {
    marginTop: 20
  },
  drawerItem: {
    paddingLeft: 10,
  },
  drawerItemLabel: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    marginLeft: -15,
  },
  separatorContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  separator: {
    backgroundColor: "#ccc",
    width: "90%",
    height: 1,
  },
  logoutSection: {
  },
});
