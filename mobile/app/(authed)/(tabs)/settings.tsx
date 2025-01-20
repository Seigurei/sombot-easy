import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { VStack } from "@/components/VStack";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "@/components/Text";

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <VStack flex={1} m={20}>
      <View style={styles.userInfoContainer}>
        <View style={styles.profileFrame}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
            }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.userInfoTextContainer}>
          <Text style={styles.userName}>Zephyr</Text>
          <Text style={styles.profileLinkText}>See your Profile</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.navOption} onPress={logout}>
        <FontAwesome name="arrow-right" size={20} color="#888" />
        <Text style={styles.navOptionText}>Logout</Text>
        <FontAwesome name="chevron-right" size={12} color="#888" />
      </TouchableOpacity>
    </VStack>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileFrame: {
    width: 85,
    height: 85,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  userInfoTextContainer: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileLinkText: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 4,
  },
  navOption: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  navOptionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
});
