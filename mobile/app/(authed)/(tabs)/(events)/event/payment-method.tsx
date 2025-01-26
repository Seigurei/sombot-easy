import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const paymentMethods = [
  { id: "1", name: "ABA PAY", description: "Tap to pay with ABA Mobile" },
  {
    id: "2",
    name: "Credit / Debit Card",
    description: "PayPal, Visa, MasterCard",
  },
  { id: "3", name: "WING BANK", description: "Tap to pay with Wing Bank" },
  { id: "4", name: "True Money", description: "Tap to pay with True Money" },
];

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const router = useRouter();

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handlePay = () => {
    if (selectedMethod) {
      router.push("/payment-success");
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Method</Text>
      </View>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.methodContainer,
              selectedMethod === item.name && styles.selectedMethod,
            ]}
            onPress={() => handleSelectMethod(item.name)}
          >
            <Text style={styles.methodName}>{item.name}</Text>
            <Text style={styles.methodDescription}>{item.description}</Text>
            <Ionicons
              name={
                selectedMethod === item.name
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color="#007BFF"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.methodList}
      />
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay</Text>
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
  methodList: {
    padding: 20,
  },
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  selectedMethod: {
    borderColor: "#007BFF",
    backgroundColor: "#F0F8FF",
  },
  methodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  methodDescription: {
    fontSize: 14,
    color: "#555",
  },
  payButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    margin: 20,
    alignItems: "center",
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
