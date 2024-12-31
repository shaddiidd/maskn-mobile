import { useContext } from "react";
import Navigation from "./Navigation";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import Context from "./Context";

export default function App() {
  const { loading } = useContext(Context);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000066",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  }
});