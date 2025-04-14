// import React, { useEffect } from "react";
// import { Button, View } from "react-native";
// import auth from "@react-native-firebase/auth";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({
//   webClientId: "YOUR_GOOGLE_WEB_CLIENT_ID",
// });

// const GoogleSignIn = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: "YOUR_GOOGLE_WEB_CLIENT_ID", // Web Client ID from Firebase Console
//     });
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       const { idToken } = await GoogleSignin.signIn();
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential = await auth().signInWithCredential(
//         googleCredential
//       );
//       console.log("Google user signed in:", userCredential.user);
//       // Now link with Supabase
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//     }
//   };

//   return (
//     <View>
//       <Button title="Sign in with Google" onPress={signInWithGoogle} />
//     </View>
//   );
// };

// export default GoogleSignIn;

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import { router } from "expo-router";

const SocialSignin = () => {
  const [loading, setLoading] = useState(false);

  const handleEmail = () => {
    setLoading(true); // Start loader immediately
    setTimeout(() => {
      router.push("/(root)/(auth)/email");
    }, 300); // slight delay to show spinner for UX smoothness
  };

  return (
    <View className=" mt-10 items-center justify-center">
      <View className=" h-[1px] flex-1 bg-gray-400" />

      <Text>Or</Text>
      <View className=" h-[1px] flex-1 bg-gray-400" />
      <TouchableOpacity className="w-full mt-4 rounded-md flex flex-row justify-center p-4 items-center  bg-gray-100">
        <Image className="w-5 h-5 mx-2" source={icons.google} />
        <Text className="text-xl font-semibold text-black">
          Continue with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full mt-4 rounded-md flex flex-row justify-center p-4 items-center  bg-gray-100">
        <Image className="w-5 h-5 mx-2" source={icons.apple} />
        <Text className="text-xl font-semibold text-black">
          Continue with Apple
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleEmail}
        className="w-full mt-4 rounded-md flex flex-row justify-center p-4 items-center  bg-gray-100"
      >
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <Image className="w-5 h-5 mx-2" source={icons.mail} />
            <Text className="text-xl font-semibold text-black">
              Continue with Email
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View />
    </View>
  );
};

export default SocialSignin;
