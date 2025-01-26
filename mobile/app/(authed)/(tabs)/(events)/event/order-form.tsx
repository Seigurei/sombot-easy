import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OrderForm() {
  const { id, quantity, ticketType } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Form</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionHeader}>Event Name</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Ticket Quantity</Text>
          <Text style={styles.value}>{quantity} pax</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ticket Type</Text>
          <Text style={styles.value}>{ticketType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>30 . 12 . 2013</Text>
        </View>
        <View style={styles.separator} />

        <Text style={styles.sectionHeader}>Buyer Detail</Text>
        <View style={styles.buyerDetail}>
          <Text style={styles.buyerInfo}>• Naruto Uzumaki</Text>
          <Text style={styles.buyerInfo}>• +855 98 765 555</Text>
          <Text style={styles.buyerInfo}>• naruto.uzumaki@gmail.com</Text>
        </View>

        <View style={styles.ticketDetail}>
          <Text style={styles.ticketDetailText}>Ticket {quantity}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push("/(events)/event/payment-method")}
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },
  buyerDetail: {
    backgroundColor: "#F6F8FB",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  buyerInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  ticketDetail: {
    backgroundColor: "#F6F8FB",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  ticketDetailText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: "center",
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
