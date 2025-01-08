import { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Context from '../../context/Context';

const TourRequestsCard = ({ type, item, handleAccept }) => {
  const navigation = useNavigation();
  const { user } = useContext(Context);

  const handlePress = () => {
    if (type === "sent" && item?.status !== "approved") {
      navigation.navigate("PropertyDetails", { property_id: item.property_id });
    } else {
      navigation.navigate("Profile", { userId: item[user.role === 1 ? "owner_id" : "tenant_id"] });
    }
  }

  const handleButtonPress = () => {
    if (item?.status === "pending") handleAccept(item.request_id);
    else navigation.navigate("Contract", { request_id: item.request_id });
  }

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={handlePress}>
      <View style={styles.cardContent}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {((type === "received" && item?.tenant?.profile_photo?.length) || (type === "sent" && item?.status === "approved" && item?.owner?.profile_photo?.length)) ? (
            <Image style={styles.profilePicture} source={{ uri: type === "received" ? item?.tenant?.profile_photo[0] : item?.owner?.profile_photo[0] }} />
          ) : (
            <View style={styles.profilePicture}>
              <Ionicons name="person" color="#666" size={25} />
            </View>
          )}
          <View style={{ flex: 1 }}>
            {type === "sent" && item?.status === "pending" && <Text style={styles.name}>Private Owner</Text>}
            {type === "sent" && item?.status === "approved" && <Text style={styles.name}>{item?.owner?.first_name} {item?.owner?.last_name}</Text>}
            {type === "received" && <Text style={styles.name}>{item?.tenant?.first_name} {item?.tenant?.last_name}</Text>}
            <Text numberOfLines={1} style={styles.propertyTitle}>{item?.property?.title}</Text>
          </View>
        </View>
        {type === "received" && (
          <TouchableOpacity activeOpacity={0.7} style={styles.greenBtn} onPress={handleButtonPress}>
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>{item?.status === "pending" ? "Accept" : "Contract"}</Text>
          </TouchableOpacity>
        )}
        {type === "sent" && item?.status === "approved" && (
          <View style={{ rowGap: 2, alignItems: "flex-end", justifyContent: "space-between" }}>
            <TouchableOpacity activeOpacity={0.7} style={styles.greenBtn} onPress={() => navigation.navigate("Contract", { request_id: item.request_id })}>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "500" }}>Contract</Text>
            </TouchableOpacity>
          </View>
        )}
        {type === "sent" && item?.status === "pending" && <Text style={{ color: "#508D4E", fontSize: 15, fontWeight: "500" }}>Pending</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    elevation: 0,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderColor: "#508D4E",
    borderWidth: 1
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  propertyTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "grey",
    marginTop: 2,
    width: "100%",
    textAlign: "left"
  },
  greenBtn: {
    backgroundColor: "#508D4E",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 7
  },
});

export default TourRequestsCard;