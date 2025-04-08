import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import { getLocales } from "expo-localization";
import { ReactNativeModal } from "react-native-modal";

import { icons, images } from "../../../constants";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { router } from "expo-router";
import { firebaseConfig, firebase } from "../../../lib/firebaseConfig";

const verify = () => {
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const textInputRef = useRef(null);
  const [detectCountry, setDetectCountry] = useState("NG");
  const phoneInputRef = useRef(null);
  const recaptchaVerifier = useRef(null); // Use RecaptchaVerifier from Firebase
  const [verification, setVerification] = useState({
    state: "default",
    code: "",
    error: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const loadPickerData = async () => {
      const locales = getLocales();
      const country = locales[0].regionCode;
      setDetectCountry(country || "NG");
    };
    loadPickerData();
  }, []);

  const sendOTP = () => {
    // Alert.alert(phone);
    setVerification({ ...verification, state: "pending" });
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phone, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhone("");
    console.log("OTP Sent!");
  };
  const verifyOTP = () => {
    const credentials = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credentials)
      .then(() => {
        setCode("");
      })
      .catch((error) => {
        setVerification({
          ...verification,
          state: "failed",
          error: error.message,
        });
      });
    setVerification({ ...verification, state: "success" });
    console.log("Phone number verified!");
  };

  return (
    <SafeAreaView className="flex-1 h-full  bg-[#ff6700]">
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View className=" flex-4 w-full mt-4 px-10">
        <Image
          source={images.icon_blue}
          alt="Ubuntu logo"
          className="h-[70px] w-[70px] "
          resizeMode="contain"
        />
        <View className="flex flex-col   items-center justify-center mb-10">
          <Image
            source={images.otp}
            alt="Ubuntu logo"
            className="h-[200px] w-[200px] "
            resizeMode="contain"
          />
        </View>
      </View>
      <View className="w-full">
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => {
            // setIsFocused(false);
            textInputRef.current?.focus();
          }}
        >
          <View className="px-10 flex-6 py-10 bg-white h-screen rounded-t-3xl  ">
            <Text className="text-3xl text-center font-bold text-black">
              Verify Your Number
            </Text>

            <KeyboardAvoidingView className="flex relative">
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => textInputRef.current?.focus()} // Trigger focus when clicked outside
              >
                <PhoneInput
                  ref={phoneInputRef}
                  defaultCode={detectCountry}
                  layout="first"
                  autoFocus={true}
                  defaultValue={phone}
                  onChangeFormattedText={setPhone}
                  withShadow={false}
                  containerStyle={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                  }}
                  textContainerStyle={{ backgroundColor: "#fff" }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={sendOTP}
                className="w-full mt-7 rounded-full flex flex-row justify-center p-4 items-center shadow-md shadow-neutral-400/70 bg-[#ff6700]"
              >
                <Text className="text-xl font-bold text-black">Send OTP</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableOpacity>
      </View>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") setIsVerified(true);
        }}
      >
        <View className="bg-white flex flex= px-7 py-9 rounded-2xl min-h-[300px]">
          <Text
            className="
          text-2xl mb-2 font-extrabold"
          >
            Verification
          </Text>
          <Text className=" text-black mb-5">
            Enter the verification code sent to {phone}
          </Text>
          <View className=" mt-5">
            <Text className="text-lg font-medium text-black mb-3">Code</Text>
            <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-full border border-neutral-100   bg-neutral-100 ">
              <Image source={icons.lock} className="h-6 w-6 ml-4" />
              <TextInput
                className="w-full text-xl"
                placeholder="123456"
                keyboardType="numeric"
                value={code}
                onChangeText={(code) =>
                  setVerification({ ...verification, code: code })
                }
              />
              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.code}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity className="w-full bg-green-500 mt-7 rounded-full flex flex-row justify-center p-4 items-center ">
            <Text className="text-lg  font-bold "> Verify OTP </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>{" "}
      <ReactNativeModal isVisible={isVerified}>
        <View className=" justify-center items-center bg-white px-7 py-9 min-h-[300px] rounded-2xl">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl text-center font-bold text-black">
            Verified
          </Text>
          <Text className="text-center text-black mt-2 text-lg">
            You have successfully verified your phone: {phone}.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsVerified(false);
              router.push("/(root)/(auth)/signup");
            }}
            className="w-full mt-7 mb-7 rounded-full flex flex-row justify-center p-6 items-center  border border-gray-950 "
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
