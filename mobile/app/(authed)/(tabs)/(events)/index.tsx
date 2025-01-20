import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import Carousel from "@/components/Carousel";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import EventList from "@/components/EventList";

const mockEvents = [
  {
    id: 1,
    title: "Music Fest 2025",
    date: "2025-02-15",
    description: "A grand music festival featuring top artists.",
    src: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    title: "Tech Conference",
    date: "2025-03-10",
    src: "https://th.bing.com/th/id/OIP.hvLnolQxX2o5u9pvO_hjHwHaFi?rs=1&pid=ImgDetMain",
    description: "Explore the latest innovations in technology.",
  },
  {
    id: 3,
    title: "Art Exhibition",
    date: "2025-01-30",
    src: "https://th.bing.com/th/id/OIP.SEw2ky0v-k9Hb8ssNj1U2QHaEw?rs=1&pid=ImgDetMain",
    description: "Showcasing artworks from renowned artists.",
  },
  {
    id: 4,
    title: "Food Carnival",
    date: "2025-04-05",
    src: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
    description: "A treat for food lovers with cuisines from around the world.",
  },
];

export default function EventsScreen() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState(mockEvents);

  function onGoToEventPage(id: number) {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEvents(mockEvents);
    } catch (error) {
      console.log("Error", "Failed to fetch events");
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Carousel />
        <View style={{ height: 16 }} />
        <EventList
          title="Popular Events"
          events={events}
          onEventPress={onGoToEventPage}
        />
        <EventList
          title="Upcoming Events"
          events={events}
          onEventPress={onGoToEventPage}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
});
