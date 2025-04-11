import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import { images } from "../../../constants";
import { getLocales } from "expo-localization";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ReactNativeModal } from "react-native-modal";
import { initializeApp } from "firebase/app";
import { supabase } from "@/lib/supabaseConfig";
import { Input } from "@rneui/themed/dist/Input";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const verify = () => {
  // const [detectCountry, setDetectCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phone, setPhone] = useState("");
  const phoneInputRef = useRef<PhoneInput>(null);
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [code, setCode] = useState("");
  // verificattion state

  const [verification, setVerification] = useState({
    state: "default",
    code: "",
    error: "",
  });

  async function sendOTP() {
    try {
      setIsloading(true);

      const { data, error } = await supabase.auth.signInWithOtp({ phone });

      console.log({ data });

      if (error) {
        throw new Error(error.message);
      }

      setVerification((prev) => ({ ...prev, state: "pending" }));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("OTP Error", error.message); // 👈 Add a title to the alert
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    } finally {
      setIsloading(false);
      console.log("OTP request completed.");
    }
  }

  async function verifyOTP() {
    setIsloading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    if (error) Alert.alert(error.message);
    if (!session) {
      Alert.alert("Please check for your Verification code");
    }
  }

  const [detectCountry, setDetectCountry] = useState("NG");

  useEffect(() => {
    async function fetchCountry() {
      try {
        const locales = getLocales();
        if (locales.length > 0) {
          const country = locales[0].regionCode;
          setDetectCountry(country || "NG");
        }
      } catch (error) {
        console.error("Error detecting country:", error);
      }
    }

    setTimeout(fetchCountry, 500); // Load in background to prevent blocking UI
  }, []);

  const handlePhoneNumberChange = (number: string) => {
    setPhone(number);
  };

  const handleVerify = () => {
    // let phone = phoneNumber;
    // if (selectedCountry !== detectCountry) {
    //   Alert.alert(
    //     "Registration Error",
    //     "You can only register from your detected country."
    //   );
    //   return;
    // }
    // // Proceed with phone number validation and authentication
    // Alert.alert(
    //   `Congrants ${phone} is a valid phone number`,
    //   "You can now proceed to the next step."
    // );
    // setVerification({
    //   ...verification,
    //   state: "success",
    // });
  };

  return (
    <SafeAreaView className="flex-1 h-full  bg-[#ff6700]">
      <View className=" flex-4 w-full mt-4 px-10">
        <Image
          source={images.icon_blue}
          alt="Ubuntu logo"
          className="h-[70px] w-[70px] "
          resizeMode="contain"
        />
        <View className="flex flex-col   items-center justify-center">
          <Image
            source={images.auth}
            alt="Ubuntu logo"
            className="h-[250px] w-[250px] "
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="w-full">
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => {
            setIsFocused(false);
            textInputRef.current?.focus();
          }}
        >
          <View className="px-10 flex-6 py-10 bg-white h-screen rounded-t-3xl  ">
            <Text className="text-3xl text-center font-bold text-black">
              Verify Your Number
            </Text>

            <KeyboardAvoidingView className=" flex  relative     ">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => Keyboard.dismiss()}
              >
                {/* <PhoneInput
                  ref={phoneInputRef}
                  defaultCode={(detectCountry as any) || "NG"}
                  layout="first"
                  onChangeFormattedText={handlePhoneNumberChange}
                  withShadow={false}
                  onChangeCountry={(country) => {
                    if (country.cca2 !== "NG") {
                      setErrorMessage(
                        "This service is not available in your selected country."
                      );
                      // setSelectedCountry("NG"); // Reset back to Nigeria
                      // phoneInputRef.current?.setState({ code: "NG" }); // Ensure UI resets
                    } else {
                      setErrorMessage(""); // Clear error if NG is selected
                    }
                  }}
                  containerStyle={{
                    marginBottom: 10,
                    backgroundColor: "transparent",
                    borderRadius: 0,
                  }}
                  textInputStyle={{
                    color: "#000",
                    fontSize: 20,
                  }}
                  codeTextStyle={{
                    color: "#666",
                    fontSize: 20,
                  }}
                  textContainerStyle={{
                    backgroundColor: "transparent",
                    borderRadius: 50,
                  }}
                /> */}
                <Input
                  label="Enter Phone Number"
                  leftIcon={{ type: "font-awesome", name: "phone" }}
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  autoCapitalize={"none"}
                  placeholder="+23480389550911"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={sendOTP}
                className="w-full mt-7 rounded-full flex flex-row justify-center p-4 items-center shadow-md shadow-neutral-400/70 bg-[#ff6700]"
              >
                <Text className="text-xl font-bold text-black ">
                  {" "}
                  Continue{" "}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableOpacity>
      </View>
      <ReactNativeModal isVisible={verification.state === "pending"}>
        <View></View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={verification.state === "success"}>
        <View className="flex-1 justify-center items-center bg-white px-7 py-9 min-h-[300px] rounded-2xl">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl text-center font-bold text-black">
            Verified
          </Text>
          <Text className="text-center text-black mt-2 text-lg">
            You have successfully verified your phone number.
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.replace("/(root)/(auth)/signup");
            }}
            className="w-full mt-7 rounded-full flex flex-row justify-center p-4 items-center shadow-md shadow-neutral-400/70 bg-[#ff6700]"
          >
            <Text className="text-xl font-bold text-black "> Continue </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
      <StatusBar backgroundColor="" style="dark" />
    </SafeAreaView>
  );
};

export default verify;
