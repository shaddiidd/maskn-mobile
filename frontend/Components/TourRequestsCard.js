import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TourRequestsCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.profile_picture} source={item.image} />
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.property}>{item.property}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity activeOpacity={0.7} style={[styles.action, { backgroundColor: "#C6131B" }]}>
            <Icon name="clear" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={[styles.action, { backgroundColor: "#41B53E" }]}>
            <Icon name="check" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.viewProfile}>View Profile</Text>
      </TouchableOpacity>
    </View>
);

export default TourRequestsCard;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        width: "100%",
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        borderColor: "#D9D9D9",
        alignItems: "center",
        elevation: 0,
        backgroundColor: '#fff',
    },
    cardContent: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profile_picture: {
        width: 70,
        height: 70,
        borderRadius: 40,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
    },
    property: {
        fontSize: 15,
        color: "grey",
    },
    actions: {
        flexDirection: "row"
    },
    action: {
        backgroundColor: "#508D4E",
        borderRadius: 50,
        padding: 5,
        marginLeft: 7
    },
    viewProfile: {
        fontSize: 15,
        fontWeight: "500",
        color: "#508D4E",
        marginTop: 10,
    }
});