import { useContext, useEffect, useState } from "react";
import Navigation from "./Navigation";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import Context from "./Context";
import InitiateSurveysModal from "./Components/InitiateSurveysModal";
import { get } from "./fetch";

export default function AppContainer() {
  const { loading, setLoading, isAuthenticated } = useContext(Context);
  const [surveyData, setSurveyData] = useState([]);

  const getSurverys = async () => {
    setLoading(true);
    try {
      const response = await get("feedback/check-filled-survey");
      if (response?.data?.length) setSurveyData(response.data);
      else setSurveyData([]);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) getSurverys()
  }, [isAuthenticated]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <InitiateSurveysModal reloadSurvey={getSurverys} surveyData={surveyData} />
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