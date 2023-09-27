import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../types/theme";

interface Props {
  title: string;
}

const QuestTitle: React.FC<Props> = ({ title }) => {
  const { colors } = useTheme<CustomTheme>();

  return (
    <View
      style={{
        backgroundColor: colors.primaryContainer,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        maxHeight: 100,
      }}
    >
      <Text variant="displaySmall" style={{ fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
};

export default QuestTitle;
