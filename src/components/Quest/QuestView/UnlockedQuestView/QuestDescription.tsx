import { Timestamp } from "firebase/firestore";
import React from "react";
import { View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../../types/theme";

interface Props {
  description: string;
  suggestedDuration: string;
  completedOn?: Timestamp;
}

const QuestDescription: React.FC<Props> = ({
  description,
  suggestedDuration,
  completedOn,
}) => {
  const { colors } = useTheme<CustomTheme>();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <Card
        style={{
          flex: 1,
          width: "100%",
          borderWidth: 2,
        }}
        contentStyle={{
          width: "100%",
          paddingVertical: 0,
          flex: 1,
        }}
      >
        {completedOn && (
          <View
            style={{
              alignItems: "center",
              position: "absolute",
              top: 10,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: colors.secondaryContainer,
              paddingVertical: 15,
            }}
          >
            <Text variant="headlineSmall">Quest Completed</Text>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
            flex: 1,
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
