import React, { useState } from "react";
import { Alert, View, TouchableOpacity, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Input } from "react-native-elements";
import { useRouter } from "expo-router";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function signUp() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push({
      pathname: "/opt",
      params: { email },
    });
  }

  return (
    <View className="items-center justify-center w-full h-full px-4">
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        className="bg-white rounded-md p-4 text-slate-900"
      />
      <View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => signUp()}
          className="bg-slate-900 text-white rounded-md py-4 px-8 mt-4"
        >
          <Text className="text-white font-bold text-md">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
