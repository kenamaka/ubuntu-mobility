import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { supabase } from "../../../lib/supabaseConfig"; // Adjust the import path as necessary
import Loading from "../../../components/Loading";
const generatePassword = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const EmailSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const { user, setSession } = useAuth();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: signInLoaded, signIn } = useSignIn();
  const [pageloading, setPageLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [mode, setMode] = useState("sign-in" | "sign-up" | null);
  const [isRegistered, setIsRegistered] = useState({
    state: "default",
  });

  //fuctions
  useEffect(() => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  }, []);
  // Your Supabase client
  const handleEmailSignup = async () => {
    setLoading(true);
    if (!isLoaded) return;

    try {
      console.log("Attempting to sign up...");
      await signUp.create({
        emailAddress: email,
        password: "placeholder-password", // Only if you're using password
      });
      setMode("sign-up");
      console.log("New user created, sending OTP...");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
      console.log("OTP sent to new user");
    } catch (err) {
      const errMsg = err?.errors?.[0]?.message || err.message;

      if (errMsg.includes("taken")) {
        try {
          console.log("Email exists. Switching to sign-in flow...");
          const signInAttempt = await signIn.create({ identifier: email });
          setMode("sign-in");
          // Get email_address_id from supportedFirstFactors
          const emailFactor = signInAttempt.supportedFirstFactors.find(
            (factor) => factor.strategy === "email_code"
          );

          if (!emailFactor) {
            throw new Error("No email_code strategy available for this user.");
          }

          console.log("Sign-in created, sending OTP with email_address_id...");
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId: emailFactor.emailAddressId,
          });

          setVerification({ ...verification, state: "pending" });
          console.log("OTP sent to existing user");
        } catch (signInErr) {
          console.error("Sign-in error:", signInErr);
          Alert.alert(
            "Sign-in Error",
            signInErr?.errors?.[0]?.longMessage || signInErr.message
          );
        }
      } else {
        console.error("Unexpected error:", err);
        Alert.alert(
          "Signup Error",
          err?.errors?.[0]?.longMessage || err.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      let authResult;

      if (mode === "sign-up") {
        authResult = await signUp.attemptEmailAddressVerification({
          code: verification.code,
        });
      } else if (mode === "sign-in") {
        authResult = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: verification.code,
        });
      } else {
        throw new Error("No authentication mode selected.");
      }

      if (authResult.status === "complete") {
        await setActive({ session: authResult.createdSessionId });
        const userEmail = authResult.emailAddress || email;

        const { data, error } = await supabase
          .from("passenger")
          .select("*")
          .eq("email", userEmail);

        if (error) throw new Error("Supabase lookup failed: " + error.message);

        const userExists = data.length > 0;
        setIsRegistered(userExists ? "yes" : "no");

        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification incomplete.",
        });
      }
    } catch (err) {
      setVerification({
        ...verification,
        error: err?.errors?.[0]?.longMessage || err.message || "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setPageLoading(true);
    setTimeout(() => {
      if (isRegistered === "yes") {
        router.replace("/root/(tabs)/home");
      } else {
        router.replace("/root/(auth)/signup"); // Or whatever your setup path is
      }
    }, 400);
  };

  if (pageloading) {
    return <Loading />;
  }
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
            <View className=" p-2 flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500 rounded-md border border-neutral-100 bg-neutral-100">
              <Image source={icons.email} className="h-7 w-7 ml-4" />
              <TextInput
                className="w-full text-lg"
                placeholder="Enter your email address"
                autoFocus
                value={email} // Bind the state here
                autoCapitalize="none"
                onChangeText={(email) => setEmail(email)}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between mt-10">
          <TouchableOpacity
            onPress={() => router.push("/root/(auth)/verify")}
            className=" mt-7 rounded-md flex flex-row justify-center p-4 items-center  bg-gray-100"
          >
            <Image source={icons.left} className="h-[16px] w-[16px]" />
            <Text className="text-lg font-bold text-black "> Back </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEmailSignup} // Call the sign-up function when Next is pressed
            className=" mt-7 rounded-md flex flex-row justify-center p-4 items-center   bg-[#ff6700]"
          >
            {loading ? (
              <ActivityIndicator size="large" color="#000000" />
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
          text-2xl  mb-2 font-extrabold"
            >
              Verification
            </Text>
            <Text className=" mt-3 text-lg text-black mb-5">
              Enter the 6 digit code sent to {email}
            </Text>
            <View className=" mt-5">
              <Text className="text-xl font-medium text-black mb-3">Code</Text>
              <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-full border border-neutral-100   bg-neutral-100 ">
                <Image source={icons.lock} className="h-6 w-6 ml-4" />
                <TextInput
                  className="w-full text-xl"
                  placeholder="123456"
                  keyboardType="numeric"
                  value={verification.code}
                  onChangeText={(code) =>
                    setVerification({ ...verification, code })
                  }
                />
              </View>
            </View>
            {verification.error && (
              <Text className="text-red-500 text-md font-medium mt-2">
                {verification.error}
              </Text>
            )}

            <TouchableOpacity
              className="w-full bg-green-500 mt-7 rounded-full flex flex-row justify-center p-4 items-center "
              onPress={handleEmailVerification}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#000000" />
              ) : (
                <Text className="text-lg  font-bold "> Verify OTP </Text>
              )}
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
              You have successfully verified your email: {email}.
            </Text>
            <TouchableOpacity
              onPress={handleContinue}
              className="w-full mt-7 mb-7 rounded-full flex flex-row justify-center p-4 items-center bg-[#011228]"
            >
              <Text className="text-xl font-bold text-white "> Continue </Text>
            </TouchableOpacity>
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailSignUp;
