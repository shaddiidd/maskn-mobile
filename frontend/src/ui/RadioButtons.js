import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RadioButtons({ selectedValue, setSelectedValue }) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, color: "#333", marginRight: 8 }}>Firnished:</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.option} onPress={() => setSelectedValue(1)}>
                <View style={[styles.radio, selectedValue && styles.selected]} />
                <Text style={styles.label}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.option} onPress={() => setSelectedValue(0)}>
                <View style={[styles.radio, !selectedValue && styles.selected]} />
                <Text style={styles.label}>No</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 10,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ccc",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    selected: {
        backgroundColor: "#508D4E",
        borderColor: "#508D4E",
    },
    label: {
        fontSize: 16,
        color: "#333",
    },
});
