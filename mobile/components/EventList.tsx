import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "@/components/Text";
import { FontAwesome } from "@expo/vector-icons";

const EventList = ({ title, events, onEventPress }: any) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={events}
        horizontal={true}
        renderItem={({ item }) => {
          const parsedDate = new Date(item.date);
          const day = parsedDate.getDate();
          const month = parsedDate.toLocaleString("default", {
            month: "short",
          });

          return (
            <TouchableOpacity
              onPress={() => onEventPress(item.id)}
              style={styles.eventCard}
            >
              <View>
                <Image
                  source={{ uri: item.url }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.overlayIcons}>
                  <View style={styles.dateIcon}>
                    <Text style={styles.dateText}>{day}</Text>
                    <Text style={styles.monthText}>{month.toUpperCase()}</Text>
                  </View>
                  <View style={styles.saveIcon}>
                    <FontAwesome name="bookmark" size={20} color="#F1573D" />
                  </View>
                </View>
              </View>
              <View style={styles.content}>
                <Text
                  style={styles.eventTitle}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <View style={styles.attendees}>
                  <View style={styles.avatarGroup}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
                      }}
                    />
                    <Image
                      style={[styles.avatar, styles.avatarOverlap]}
                      source={{
                        uri: "https://th.bing.com/th/id/OIP.SEw2ky0v-k9Hb8ssNj1U2QHaEw?rs=1&pid=ImgDetMain",
                      }}
                    />
                    <Image
                      style={[styles.avatar, styles.avatarOverlap]}
                      source={{
                        uri: "https://th.bing.com/th/id/R.b9f817c9f2438a49a1e8146283ea93bf?rik=BVUOGaU935kBbA&pid=ImgRaw&r=0",
                      }}
                    />
                  </View>
                  <Text style={styles.goingText}>+200 Going</Text>
                </View>
                <View style={styles.location}>
                  <FontAwesome name="map-marker" size={16} color="#716E90" />
                  <Text style={styles.eventDate}>{item.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  eventCard: {
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: "white",
    borderRadius: 18,
    padding: 10,
    width: 237,
    height: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 220,
    height: 160,
    borderRadius: 10,
    marginBottom: 8,
  },
  overlayIcons: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateIcon: {
    width: 45,
    height: 47,
    backgroundColor: "#FFFFFF",
    opacity: 0.7,
    padding: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#326EE4",
  },
  monthText: {
    fontSize: 10,
    color: "#326EE4",
  },
  saveIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    opacity: 0.7,
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "column",
    gap: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#171766",
  },
  attendees: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  avatarGroup: {
    flexDirection: "row",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  avatarOverlap: {
    marginLeft: -20,
  },
  goingText: {
    fontSize: 12,
    color: "#F1573D",
  },
  location: {
    flexDirection: "row",
    gap: 4,
  },
  eventDate: {
    fontSize: 14,
    color: "#2B2849",
  },
});
