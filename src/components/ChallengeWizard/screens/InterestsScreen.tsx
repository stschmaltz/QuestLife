import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ThemedButton from "../../themed/ThemedButton";

interface Props {
  interests: string[];
  onSelectInterest: (interest: string) => void;
  onDone: () => void;
}

const InterestsScreen: React.FC<Props> = ({
  interests,
  onSelectInterest,
  onDone,
}) => (
  <View>
    <Text>Select Interests</Text>
    {["FOOD", "EXERCISE", "SPORTS", "VIDEO_GAMES"].map((interest) => (
      <ThemedButton
        key={interest}
        onPress={() => onSelectInterest(interest)}
        style={{
          backgroundColor: interests.includes(interest)
            ? "lightgrey"
            : "transparent",
        }}
      >
        {interest}
      </ThemedButton>
    ))}
    <ThemedButton onPress={onDone}>Done</ThemedButton>
  </View>
);

export default InterestsScreen;
