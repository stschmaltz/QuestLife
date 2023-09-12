import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default function SignUp() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => {
          console.log("sign up");
        }}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
