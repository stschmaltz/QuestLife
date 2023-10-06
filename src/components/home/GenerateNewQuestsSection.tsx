import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../theme/theme.types";
import ThemedButton from "../themed/ThemedButton";

interface Props {}

const GenerateNewQuestsSection: React.FC<Props> = () => {
  const router = useRouter();
  const { colors } = useTheme<CustomTheme>();

  return (
    <View style={{ alignItems: "center" }}>
      <ThemedButton
        mode="contained"
        style={{
          margin: 10,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 35,
          backgroundColor: colors.secondary,
        }}
        onPress={() => router.push("/new-quest")}
      >
        <Text
          variant="titleMedium"
          style={{
            fontWeight: "bold",
          }}
        >
          Generate a new set of quests!
        </Text>
      </ThemedButton>
    </View>
  );
};

export default GenerateNewQuestsSection;
