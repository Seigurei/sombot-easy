import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TicketDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(2);
  const price = 30;
  const total = quantity * price;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Detail</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eventName}>Popular Event</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <View style={styles.calendar}>
          <Text style={styles.calendarText}>July 2024</Text>
          <Text style={styles.selectedDate}>1</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Ticket Quantity</Text>
          <Text style={styles.paxLabel}>Pax</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleDecrease}
            >
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleIncrease}
            >
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.dateLabel}>Date:</Text>
          <Text style={styles.dateValue}>30 . 12 . 2013</Text>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => router.push("/(events)/event/order-form")}
      >
        <Text style={styles.buyButtonText}>Buy Ticket</Text>
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
    backgroundColor: "#007BFF",
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  eventName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  calendar: {
    backgroundColor: "#F6F8FB",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  calendarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  selectedDate: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  paxLabel: {
    fontSize: 14,
    color: "#555",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#F6F8FB",
    padding: 10,
    borderRadius: 5,
  },
  controlText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  totalContainer: {
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  buyButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
