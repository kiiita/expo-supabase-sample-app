import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Auth from "../components/Auth";
import Account from "../components/Account";
import { View, Text, Button } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useRouter, Slot, useRootNavigationState, Redirect } from "expo-router";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const rootNavigationState = useRootNavigationState();

  console.log("session", session);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error logging out:", error.message);
  };

  if (!rootNavigationState?.key) return null;

  if (loading) return <Text>Loading...</Text>;

  return (
    <View className="flex items-center justify-center bg-slate-400 py-8 ">
      <Text className="text-2xl">Supabase Auth Example</Text>
      {session && session.user ? (
        <>
          <Account session={session} />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Redirect href="/sign-in" />
      )}
    </View>
  );
}
