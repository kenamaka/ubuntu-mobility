import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const onboarding = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  // 🔹 Send OTP
  const verifyPhone = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      console.log("OTP Sent!");
    } catch (error) {
      console.error("OTP Error:", error);
    }
  };

  const verifyOTP = async () => {
    if (!confirm) return;
    try {
      await confirm.confirm(code);
      console.log("User signed in!");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Phone Number"
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Send OTP" onPress={verifyPhone} />

      {confirm && (
        <>
          <TextInput
            placeholder="Enter OTP"
            onChangeText={setCode}
            keyboardType="number-pad"
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
        </>
      )}
    </View>
  );
};

export default onboarding;
