import { Slot } from "expo-router";
import { AuthenticationProvider } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";

export default function Root() {
  LogBox.ignoreLogs(['No route named "ticket" exists in nested children']);
  return (
    <>
      <StatusBar style="dark" />
      <AuthenticationProvider>
        <Slot />
      </AuthenticationProvider>
    </>
  );
}
