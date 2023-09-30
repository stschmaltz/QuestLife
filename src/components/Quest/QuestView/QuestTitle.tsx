import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import { CustomTheme } from "../../../theme/theme.types";

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
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: colors.shadow,
      }}
    >
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
};

export default QuestTitle;
