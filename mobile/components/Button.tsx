import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { defaultShortcuts } from "@/styles/shortcuts";

interface ButtonProps {
  variant?: "contained" | "outlined" | "ghost";
  isLoading?: boolean;
  backgroundColor?: string;
  onPress: () => void;
  children: React.ReactNode;
  style?: object;
}

export const Button = ({
  onPress,
  children,
  variant = "contained",
  isLoading,
  backgroundColor,
  style,
  ...restProps
}: ButtonProps) => (
  <TouchableOpacity
    disabled={isLoading}
    onPress={onPress}
    style={[
      defaultShortcuts(restProps),
      styles[variant].button,
      isLoading && disabled.button,
      backgroundColor && { backgroundColor },
      style,
    ]}
    {...restProps}
  >
    {isLoading ? (
      <ActivityIndicator animating={isLoading} size={22} />
    ) : (
      <Text style={styles[variant].text}>{children}</Text>
    )}
  </TouchableOpacity>
);

const styles = {
  contained: StyleSheet.create({
    button: {
      padding: 14,
      borderRadius: 50,
      backgroundColor: "black",
    },
    text: {
      textAlign: "center",
      color: "white",
      fontSize: 18,
    },
  }),
  outlined: StyleSheet.create({
    button: {
      padding: 14,
      borderRadius: 50,
      borderColor: "darkgray",
      borderWidth: 1,
    },
    text: {
      textAlign: "center",
      color: "black",
      fontSize: 18,
    },
  }),
  ghost: StyleSheet.create({
    button: {
      padding: 14,
      borderRadius: 50,
      backgroundColor: "transparent",
    },
    text: {
      textAlign: "center",
      color: "black",
      fontSize: 18,
    },
  }),
};

const disabled = StyleSheet.create({
  button: {
    opacity: 0.5,
  },
});
