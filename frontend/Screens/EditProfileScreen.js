import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function EditProfileScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text>edit profile</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: "center",
        minWidth: "100%",
        minHeight: "100%",
        padding: 20,
    },
})