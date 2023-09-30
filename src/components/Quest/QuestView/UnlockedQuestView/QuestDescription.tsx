import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

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
      <Card
        style={{
          paddingVertical: 0,
          paddingHorizontal: 20,
          marginVertical: 20,
          borderWidth: 2,
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
              paddingTop: 20,
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
      </Card>
    </View>
  );
};

export default QuestDescription;
