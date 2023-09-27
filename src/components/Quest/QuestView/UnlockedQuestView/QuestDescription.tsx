import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
  description: string;
  suggestedDuration: string;
}

const QuestDescription: React.FC<Props> = ({
  description,
  suggestedDuration,
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="bodyLarge">{description}</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 30,
          }}
        >
          <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
            Estimated Duration:{" "}
          </Text>
          <Text variant="bodyLarge" style={{}}>
            {suggestedDuration}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 30,
          maxHeight: 120,
        }}
      />
    </View>
  );
};

export default QuestDescription;
