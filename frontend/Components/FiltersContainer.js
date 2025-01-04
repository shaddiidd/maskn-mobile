import { StyleSheet, View, ScrollView, Text } from "react-native";

export default function FiltersContainer({ filters }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: "#eee" }} contentContainerStyle={styles.container}>
            {Object.entries(filters).map(([key, value]) => value && (
                <View style={styles.filterContainer}>
                    <Text numberOfLines={1} style={styles.filterTxt}>{value}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: "100%",
        flexDirection: "row",
        columnGap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
    },
    filterContainer: {
        backgroundColor: "#508D4E",
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    filterTxt: {
        color: "#fff",
        fontSize: 15
    },
    
});