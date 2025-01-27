import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MyBooking() {
  return (
    <View style={styles.container}>
      <Ionicons
        name="calendar-outline"
        size={80}
        color="gray"
        style={styles.icon}
      />
      <Text style={styles.text}>No Bookings Yet</Text>
      <Text style={styles.subtext}>
        You have no bookings. Start exploring events and book your favorites!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  icon: {
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});
