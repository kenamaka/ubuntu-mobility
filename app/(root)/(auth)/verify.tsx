import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { auth } from "../../../lib/firebaseConfig"; // Adjust the import path as necessary
import { signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

const verify = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState<ConfirmationResult | null>(null);

  // 🔹 Send OTP
  const verifyPhone = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone);
      setConfirm(confirmation);
      console.log("OTP Sent!");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("OTP Error", error.message); // 👈 Add a title to the alert
        console.error("Error:", error.message);
        console.error("OTP Error:", error);
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TextInput
        placeholder="Phone Number"
        onChangeText={(text) => {
          console.log("Phone input:", text); // 👈 Log it here
          setPhone(text);
        }}
        keyboardType="phone-pad"
      />
      <Button title="Send OTP" onPress={verifyPhone} />
    </View>
  );
};

export default verify;
