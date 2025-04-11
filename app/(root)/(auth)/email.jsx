import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { ActivityIndicator } from "react-native";

const EmailSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailSignup = async () => {
    setLoading(true);
    if (!emailRegex.test(email)) {
      Alert.alert("Enter a valid Email Address.");
      setLoading(false);
    }
    if (!isLoaded) return;
    try {
      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
    } catch (err) {
      setLoading(false);
      Alert.alert(err.message);

      setVerification({ ...verification, state: "failed", error: err.message });

      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleEmailVerification = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      setVerification({ ...verification, code: err.message, state: "failed" });

      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <SafeAreaView className="flex-1 h-full px-10 py-6 bg-white">
      <ScrollView className="flex-1 ">
        <View className=" w-full py-5 mb-6">
          <Image
            source={images.icon_blue}
            alt="Ubuntu logo"
            className="h-[70px] w-[70px] "
            resizeMode="contain"
          />
        </View>
        <Text className="text-3xl font-bold text-black mt-10">
          What's your email address?
        </Text>
        <View className="mt-14">
          <View className=" mt-6">
            <Text className="text-lg font-medium text-black mb-3">Email</Text>
            <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500 rounded-full border border-neutral-100 bg-neutral-100">
              <Image source={icons.email} className="h-6 w-6 ml-4" />
              <TextInput
                className="w-full"
                placeholder="Enter your email address"
                autoFocus
                value={email} // Bind the state here
                autoCapitalize="none"
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput />
            </View>
          </View>
          <View className=" mt-6">
            <Text className="text-lg font-medium text-black mb-3">
              Password
            </Text>
            <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500 rounded-full border border-neutral-100 bg-neutral-100">
              <Image source={icons.lock} className="h-6 w-6 ml-4" />
              <TextInput
                className="w-full"
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password} // Bind the state here
                autoCapitalize="none"
                onChangeText={(password) => setPassword(password)}
              />
              <TextInput />
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between mt-10">
          <TouchableOpacity
            onPress={() => router.push("/(root)/(auth)/verify")}
            className=" mt-7 rounded-full flex flex-row justify-center p-4 items-center  bg-gray-100"
          >
            <Image source={icons.left} className="h-[16px] w-[16px]" />
            <Text className="text-lg font-bold text-black "> Back </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEmailSignup} // Call the sign-up function when Next is pressed
            className=" mt-7 rounded-full flex flex-row justify-center p-4 items-center   bg-[#ff6700]"
          >
            {" "}
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text className="text-lg font-bold text-black "> Next </Text>
                <Image source={icons.right} className="h-[16px] w-[16px]" />
              </>
            )}
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
              Enter the verification code sent to {email}
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
                  onChangeText={(code) => setCode(code)}
                />
                {verification.error && (
                  <Text className="text-red-500 text-sm mt-1">
                    {verification.code}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              className="w-full bg-green-500 mt-7 rounded-full flex flex-row justify-center p-4 items-center "
              onPress={handleEmailVerification}
            >
              <Text className="text-lg  font-bold "> Verify OTP </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
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
              You have successfully verified your phone: {email}.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsVerified(false);
                router.push("/(root)/(auth)/signup");
              }}
              className="w-full mt-7 mb-7 rounded-full flex flex-row justify-center p-4 items-center bg-[#011228]"
            >
              <Text className="text-xl font-bold text-white "> Continue </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>{" "}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailSignUp;
