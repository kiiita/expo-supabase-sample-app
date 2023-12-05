import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "react-native-elements";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

export default function OtpInput() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();
  const { email } = params;

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", session);
      if (session) {
        router.replace("/");
      }
    });
  }, []);

  async function verifyOtp() {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email as string,
      token: otp,
      type: "email",
    });
    if (error) {
      Alert.alert("Verification failed", error.message);
    } else {
      console.log("verifyOtp data", session);
      const { data, error } = await supabase.auth.setSession({
        access_token: session?.access_token as string,
        refresh_token: session?.refresh_token as string,
      });
      console.log("setSession data", data);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Verify OTP",
        }}
      />
      <Input
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        returnKeyType="done"
        onSubmitEditing={verifyOtp}
      />
      <Button
        title="Verify OTP"
        onPress={verifyOtp}
        disabled={otp.length !== 6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
