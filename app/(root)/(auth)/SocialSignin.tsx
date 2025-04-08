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

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons, images } from "@/constants";

const GoogleSignin = () => {
  return (
    <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
      <View className="flex-1 h-[1px] bg-gray-100" />

      <Text>Or</Text>
      <View className="flex-1 h-[1px] bg-gray-100" />
      <TouchableOpacity>
        <View className="flex flex-row justify-center items-center bg-[#4285F4] px-4 py-2 rounded-full gap-x-3">
          <Image className="w-5 h-5 mx-2" source={icons.google} />
          <Text className="text-white font-semibold">Sign in with Google</Text>
        </View>
      </TouchableOpacity>

      <View />
    </View>
  );
};

export default GoogleSignin;
