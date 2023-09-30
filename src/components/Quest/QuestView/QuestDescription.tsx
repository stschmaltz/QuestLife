import { Timestamp } from "firebase/firestore";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../theme/theme.types";
import ThemedCard from "../../themed/ThemedCard";

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
      <ThemedCard>
        {completedOn && (
          <View
            style={{
              alignItems: "center",
              position: "absolute",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              width: "100%",
              justifyContent: "center",
              backgroundColor: colors.secondaryContainer,
              paddingVertical: 10,
            }}
          >
            <Text variant="headlineSmall">Quest Completed</Text>
            <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
              {completedOn.toDate().toLocaleDateString()}
            </Text>
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
      </ThemedCard>
    </View>
  );
};

export default QuestDescription;
