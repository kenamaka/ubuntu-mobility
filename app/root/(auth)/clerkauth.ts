// import * as React from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import { useSignUp } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState("");

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return;

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true);
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // Handle submission of verification form

//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={(code) => setCode(code)}
//         />
//         <TouchableOpacity onPress={onVerifyPress}>
//           <Text>Verify</Text>
//         </TouchableOpacity>
//       </>
//     );
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <TouchableOpacity onPress={onSignUpPress}>
//           <Text>Continue</Text>
//         </TouchableOpacity>
//         <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
//           <Text>Already have an account?</Text>
//           <Link href="/sign-in">
//             <Text>Sign in</Text>
//           </Link>
//         </View>
//       </>
//     </View>
//   );
// }

// mine
// const handleEmailSignup = async () => {
//   setLoading(true);
//   if (!signInLoaded || !signUpLoaded) return;
//   setLoading(true);

//   try {
//     //check if user already has an account
//     await signIn.create({ identifier: email });
//     await signIn.prepareFirstFactor({ strategy: "email_code" });

//     setMode("sign-in");

//     // ✅ OTP Sent
//     // router.push({ pathname: "/verify", params: { email, mode: "sign-in" } });

//     setVerification({ ...verification, state: "pending" });

//     // Set 'pendingVerification' to true to display second form
//     // and capture OTP code
//   } catch (err) {
//     console.error(JSON.stringify(err, null, 2));

//     if (err.errors?.[0]?.code === "form_identifier_not_found") {
//       try {
//         await signUp.create({
//           emailAddress: email,
//           password,
//         });

//         setMode("sign-up");
//         // Send user an email with verification code
//         await signUp.prepareEmailAddressVerification({
//           strategy: "email_code",
//         });
//         setVerification({ ...verification, state: "pending" });
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         Alert.alert(err.message);

//         setVerification({
//           ...verification,
//           state: "failed",
//           error: err.message,
//         });
//       }
//     }
//     setLoading(false);
//   }
// };

// const handleEmailVerification = async () => {
//   setLoading(true);
//   try {
//     if (mode === "sign-in") {
//       const result = await signIn.attemptFirstFactor({ code });
//       if (result.status === "complete") {
//         //       //Todo: add user to database
//         setLoading(false);
//         setVerification({ ...verification, state: "success" });
//       } else {
//         throw new Error("Invalid code");
//       }
//     } else if (mode === "sign-up") {
//       await signUp.attemptEmailAddressVerification({ code });
//       const result = await signUp.activate();
//       if (result.status === "complete") {
//         //       //Todo: add user to database
//         setLoading(false);
//         setVerification({ ...verification, state: "success" });
//       } else {
//         throw new Error("Sign-up failed");
//       }
//     }
//   } catch (err) {
//     Alert.alert("Verification Error", err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//  <View className=" mt-6">
//             <Text className="text-lg font-medium text-black mb-3">
//               Password
//             </Text>
//             <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500 rounded-full border border-neutral-100 bg-neutral-100">
//               <Image source={icons.lock} className="h-6 w-6 ml-4" />
//               <TextInput
//                 className="w-full"
//                 placeholder="Enter your password"
//                 secureTextEntry={true}
//                 value={password} // Bind the state here
//                 autoCapitalize="none"
//                 onChangeText={(password) => setPassword(password)}
//               />
//               <TextInput />
//             </View>
//           </View>
