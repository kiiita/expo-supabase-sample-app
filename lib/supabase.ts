import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwzcnxupytnamwhaxwip.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3emNueHVweXRuYW13aGF4d2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3Mzk0ODAsImV4cCI6MjAxNzMxNTQ4MH0.Z5MJ05V-se9PNKawwyutD6lMAXBodTElAazkarmXmOw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
