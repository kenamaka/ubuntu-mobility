import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { supabase } from "@/lib/supabaseConfig";
import { ActivityIndicator } from "react-native";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkUserId = user?.id;
  const isValidPhone = (phone: string) => {
    const regex = /^(?:\+?234|0)?[789][01]\d{8}$/;
    return regex.test(phone);
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    if (!user) {
      Alert.alert("Error", "User not loaded. Please try again.");
      setLoading(false);
      return;
    }

    if (!firstName || !lastName || !phone) {
      Alert.alert("Error", "Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert("Error", "Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    const email = user?.primaryEmailAddress?.emailAddress;
    const clerkUserId = user?.id;

    const { error } = await supabase.from("passenger").insert({
      email,
      phone,
      full_name: `${firstName} ${lastName}`,
      clerk_user_id: clerkUserId,
    });

    if (error) {
      // console.error("Error inserting data:", error.message);
      Alert.alert("Error", error.message);
      setLoading(false);
    } else {
      router.replace("/root/(tabs)/home");
    }
  };

  return (
    <SafeAreaView className="flex-1 h-full px-10 py-6 bg-white">
      <ScrollView className="flex-1 ">
        <KeyboardAvoidingView>
          <View className=" w-full py-5 mb-6">
            <Image
              source={images.icon_black}
              alt="Ubuntu logo"
              className="h-[70px] w-[70px] "
              resizeMode="contain"
            />
          </View>
          <Text className="text-3xl font-bold text-black">
            Welcome! Just a Few More Details
          </Text>
          <View className=" mt-5">
            <Text className="text-lg font-medium text-black mb-3">
              First Name
            </Text>
            <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-md border border-neutral-100   bg-neutral-100 ">
              <Image source={icons.person} className="h-6 w-6 ml-4" />
              <TextInput
                autoFocus
                className="w-full"
                placeholder="Please enter first name"
                keyboardType="default"
                value={firstName}
                onChangeText={(fname) => setFirstName(fname)}
              />
            </View>
          </View>
          <View className=" mt-5">
            <Text className="text-lg font-medium text-black mb-3">
              Last Name
            </Text>
            <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-md border border-neutral-100   bg-neutral-100 ">
              <Image source={icons.person} className="h-6 w-6 ml-4" />
              <TextInput
                className="w-full"
                placeholder="Please enter surname"
                keyboardType="default"
                onChangeText={(lname) => setLastName(lname)}
                value={lastName}
              />
            </View>
          </View>

          <View className=" mt-5">
            <Text className="text-lg font-medium text-black mb-3">Phone</Text>
            <View className=" flex flex-row rounded-md justify-start items-center relative border-b-2 focus:border-neutral-500  border border-neutral-100   bg-neutral-100 ">
              <Image source={icons.lock} className="h-6 w-6 ml-4" />
              <TextInput
                className="w-full"
                placeholder="Enter Phone Number"
                keyboardType="numeric"
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full mt-16 rounded-md flex flex-row justify-center p-4 items-center  bg-[#ff6700]"
            >
              {loading ? (
                <ActivityIndicator size="large" color="#000000" />
              ) : (
                <Text className="text-lg font-bold text-black ">
                  {" "}
                  Continue{" "}
                </Text>
              )}
            </TouchableOpacity>
            {/* <Text>By Signing up, you agree to our Terms and Privacy Policy.</Text> */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
