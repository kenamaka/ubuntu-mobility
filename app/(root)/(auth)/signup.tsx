// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { icons, images } from "../../../constants";
// import CustomInput from "@/components/layout/CustomInput";
// import { useState } from "react";

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//   });
//   return (
//     <SafeAreaView className="flex-1 h-full px-10 py-6 bg-white">
//       <ScrollView className="flex-1 ">
//         <View className=" w-full py-5 mb-6">
//           <Image
//             source={images.icon_black}
//             alt="Ubuntu logo"
//             className="h-[70px] w-[70px] "
//             resizeMode="contain"
//           />
//         </View>
//         <Text className="text-3xl font-bold text-black">Sign Up</Text>
//         {/* <CustomInput
//           label="name"
//           placeholder="Enter your name"
//           icon={icons.person}
//           value={form.name}
//           // onChangeText={(e) => setForm(e.target.value)}
//         /> */}
//         <View className=" mt-5">
//           <Text className="text-lg font-medium text-black mb-3">Name</Text>
//           <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-full border border-neutral-100   bg-neutral-100 ">
//             <Image source={icons.person} className="h-6 w-6 ml-4" />
//             <TextInput className="w-full" placeholder="Enter your name" />
//           </View>
//         </View>
//         <View className=" mt-5">
//           <Text className="text-lg font-medium text-black mb-3">Email</Text>
//           <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-full border border-neutral-100   bg-neutral-100 ">
//             <Image source={icons.email} className="h-6 w-6 ml-4" />
//             <TextInput
//               className="w-full"
//               placeholder="Enter your email address"
//             />
//           </View>
//         </View>
//         <View className=" mt-5">
//           <Text className="text-lg font-medium text-black mb-3">Phone</Text>
//           <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-full border border-neutral-100   bg-neutral-100 ">
//             <Image source={icons.person} className="h-6 w-6 ml-4" />
//             <TextInput
//               className="w-full"
//               placeholder="Enter your mobile number"
//             />
//           </View>
//         </View>
//         <View className=" mt-5">
//           <Text className="text-lg font-medium text-black mb-3">Password</Text>
//           <View className=" flex flex-row justify-start items-center relative border-b-2 focus:border-neutral-500  rounded-full border border-neutral-100   bg-neutral-100 ">
//             <Image source={icons.lock} className="h-6 w-6 ml-4" />
//             <TextInput className="w-full" placeholder="Create password" />
//           </View>
//         </View>
//         <View>
//           <TouchableOpacity className="w-full mt-7 rounded-full flex flex-row justify-center p-4 items-center shadow-md shadow-neutral-400/70 bg-[#ff6700]">
//             <Text className="text-lg font-bold text-black "> Sign Up </Text>
//           </TouchableOpacity>
//           {/* <Text>By Signing up, you agree to our Terms and Privacy Policy.</Text> */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Signup;
