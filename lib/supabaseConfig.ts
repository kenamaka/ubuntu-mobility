import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://axegledgpzvyuchyebgl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4ZWdsZWRncHp2eXVjaHllYmdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MzI0NjUsImV4cCI6MjA1ODQwODQ2NX0.4ZO0U8XD-sD_8I0NVST1pL7WtEWVXBLDhxXtOT80hFo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
