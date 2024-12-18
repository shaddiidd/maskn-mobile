import { StyleSheet, Text, View, ScrollView } from "react-native";
import TextField from "../Components/TextField";

export default function PostProperty() {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      <Text style={styles.heading}>Property Images</Text>
      

      <Text style={styles.heading}>Property Information</Text>
      <TextField placeholder="Title" />
      <TextField textarea placeholder="Description" />
      <TextField placeholder="Address" />
      <TextField placeholder="Floor" />
      <TextField placeholder="Number of Bathrooms" />
      <TextField placeholder="Number of Bedrooms" />
      <TextField placeholder="Area (SQM)" />
      <TextField placeholder="Property Age (Years)" />
      <TextField placeholder="Google Maps Location" />

      <Text style={styles.heading}>Government & Contract</Text>
      <TextField placeholder="Property National Number" />
      <TextField placeholder="Property National Number" />
      <TextField placeholder="Rental Period (Months)" />
      <TextField placeholder="Price" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
});
