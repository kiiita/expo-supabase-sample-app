import React from "react";
import { View, Text, Image } from "react-native";
import { Link, Stack } from "expo-router";
import Auth from "../../components/Auth";

function LogoTitle() {
  return (
    <Image
      style={{ width: 32, height: 32 }}
      source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
    />
  );
}

export default function SignIn() {
  return (
    <View className="flex items-center justify-center bg-slate-400 py-8">
      <Stack.Screen
        options={{
          title: "Sign In",
          headerStyle: { backgroundColor: "#aaa" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Auth />
    </View>
  );
}
