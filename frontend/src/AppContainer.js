import { useContext, useEffect, useState } from "react";
import Navigation from "./navigation/Navigation";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import Context from "./context/Context";
import InitiateSurveysModal from "./components/survey/InitiateSurveysModal";
import { get } from "./utils/fetch";

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
    if (isAuthenticated) getSurverys();
  }, [isAuthenticated]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <InitiateSurveysModal reloadSurvey={getSurverys} setSurveyData={setSurveyData} surveyData={surveyData} />
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
    zIndex: 100
  }
});