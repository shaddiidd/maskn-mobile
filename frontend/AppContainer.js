import { useContext } from "react";
import Navigation from "./Navigation";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Context from "./Context";

export default function App() {
  const { loading } = useContext(Context);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
      {loading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000066",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </>
  );
}