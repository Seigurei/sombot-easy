import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Carousel from "@/components/Carousel";
import { useAuth } from "@/context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { eventservice } from "@/services/events";
import EventList from "@/components/EventList";
import { Appbar, Avatar, Badge } from "react-native-paper";

// const mockEvents = [
//   {
//     id: 1,
//     title: "Music Fest 2025",
//     date: "2025-02-15",
//     description: "A grand music festival featuring top artists.",
//     src: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
//   },
//   {
//     id: 2,
//     title: "Tech Conference",
//     date: "2025-03-10",
//     src: "https://th.bing.com/th/id/OIP.hvLnolQxX2o5u9pvO_hjHwHaFi?rs=1&pid=ImgDetMain",
//     description: "Explore the latest innovations in technology.",
//   },
//   {
//     id: 3,
//     title: "Art Exhibition",
//     date: "2025-01-30",
//     src: "https://th.bing.com/th/id/OIP.SEw2ky0v-k9Hb8ssNj1U2QHaEw?rs=1&pid=ImgDetMain",
//     description: "Showcasing artworks from renowned artists.",
//   },
//   {
//     id: 4,
//     title: "Food Carnival",
//     date: "2025-04-05",
//     src: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
//     description: "A treat for food lovers with cuisines from around the world.",
//   },
// ];

export default function EventsScreen() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  function onGoToEventPage(id) {
    router.push(`/(events)/event/${id}`);
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventservice.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Avatar.Image
          size={40}
          source={{
            uri: "https://th.bing.com/th/id/R.e705a39be39b16ff77009f75f0655edb?rik=z%2fMdWKV%2frAxACg&pid=ImgRaw&r=0",
          }}
          style={{ backgroundColor: "white" }}
        />
        <Appbar.Content title="SombotEasy" titleStyle={styles.headerTitle} />
        <View style={styles.notificationContainer}>
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <Avatar.Icon
              size={40}
              icon="bell"
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          <Badge size={10} style={styles.notificationBadge} />
        </View>
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Carousel />
        <View style={styles.spacer} />
        <EventList
          title="Popular Events"
          events={events}
          onEventPress={onGoToEventPage}
        />
        <EventList
          title="Upcoming Events"
          events={events.slice().reverse()}
          onEventPress={onGoToEventPage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#326EE4",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },
  notificationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  notificationIcon: {
    backgroundColor: "#ffffff",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: 0,
    backgroundColor: "red",
    zIndex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  spacer: {
    height: 16,
  },
});
