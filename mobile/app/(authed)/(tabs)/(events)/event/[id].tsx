import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function EventDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F8FB" }}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.SEw2ky0v-k9Hb8ssNj1U2QHaEw?rs=1&pid=ImgDetMain",
            }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.eventTitle}>Popular Event</Text>
            <Text style={styles.eventDate}>Date: 30 . 12 . 20012</Text>
            <Text style={styles.eventPlace}>Place:</Text>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.sectionTitle}>Information</Text>
            <Text style={styles.sectionContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.sectionTitle}>Ticket</Text>
            <View style={styles.ticketContainer}>
              <Button
                mode="contained"
                style={[styles.ticketButton, styles.regularButton]}
                onPress={() => router.push("/(events)/event/ticket/vip")}
              >
                Regular $30
              </Button>
              <Button
                mode="contained"
                style={[styles.ticketButton, styles.vipButton]}
                onPress={() => router.push("/(events)/event/ticket/vip")}
              >
                VIP $45
              </Button>
              <Button
                mode="contained"
                style={[styles.ticketButton, styles.tableButton]}
                onPress={() => router.push("/(events)/event/ticket/vip")}
              >
                Table $55
              </Button>
              <Button
                mode="contained"
                style={[styles.ticketButton, styles.platinumButton]}
                onPress={() => router.push("/(events)/event/ticket/vip")}
              >
                Platinum $100
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: (30 / 100) * height,
    width: "100%",
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F6F8FB",
    padding: 16,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  eventPlace: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  ticketContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ticketButton: {
    borderRadius: 8,
    marginBottom: 8,
    width: "48%",
    paddingVertical: 8,
  },
  regularButton: {
    backgroundColor: "#FF6F61",
  },
  vipButton: {
    backgroundColor: "#4CAF50",
  },
  tableButton: {
    backgroundColor: "#FFC107",
  },
  platinumButton: {
    backgroundColor: "#3F51B5",
  },
});
